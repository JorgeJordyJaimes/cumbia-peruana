-- ======================================================================================================================
-- AUTOMATIZACIÓN DE TÍTULOS DE SINGLES / DISCOS DE 45 RPM ('Lado A / Lado B')
-- ======================================================================================================================

-- 1. Función para sincronizar el título de un Single a partir de sus temas en Albumes_Temas
CREATE OR REPLACE FUNCTION fn_sync_single_title(p_id_album INT)
RETURNS VOID AS $$
DECLARE
    v_tipo INT;
    v_side_a TEXT;
    v_side_b TEXT;
    v_new_title TEXT;
BEGIN
    -- Solo aplica a discos tipo 1 (Singles / 45 RPM)
    SELECT id_tipo_album INTO v_tipo FROM Albumes WHERE id_album = p_id_album;
    IF v_tipo IS DISTINCT FROM 1 THEN
        RETURN;
    END IF;

    -- Obtener temas del Lado A ordenados por numero_pista
    SELECT string_agg(t.titulo_tema, ', ' ORDER BY at.numero_pista)
    INTO v_side_a
    FROM Albumes_Temas at
    JOIN Temas t ON at.id_tema = t.id_tema
    WHERE at.id_album = p_id_album AND UPPER(TRIM(at.lado)) = 'A';

    -- Obtener temas del Lado B ordenados por numero_pista
    SELECT string_agg(t.titulo_tema, ', ' ORDER BY at.numero_pista)
    INTO v_side_b
    FROM Albumes_Temas at
    JOIN Temas t ON at.id_tema = t.id_tema
    WHERE at.id_album = p_id_album AND UPPER(TRIM(at.lado)) = 'B';

    -- Construir el título: 'Tema Lado A / Tema Lado B'
    IF v_side_a IS NOT NULL AND v_side_b IS NOT NULL THEN
        v_new_title := v_side_a || ' / ' || v_side_b;
    ELSIF v_side_a IS NOT NULL THEN
        v_new_title := v_side_a;
    ELSIF v_side_b IS NOT NULL THEN
        v_new_title := v_side_b;
    ELSE
        RETURN;
    END IF;

    -- Actualizar el álbum si el título difiere
    UPDATE Albumes
    SET nombre_album = v_new_title
    WHERE id_album = p_id_album AND (nombre_album IS DISTINCT FROM v_new_title);
END;
$$ LANGUAGE plpgsql;

-- 2. Trigger sobre Albumes_Temas: cuando se inserta, modifica o elimina una pista de un single
CREATE OR REPLACE FUNCTION trg_albumes_temas_sync_single_title()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'DELETE' THEN
        PERFORM fn_sync_single_title(OLD.id_album);
        RETURN OLD;
    ELSE
        PERFORM fn_sync_single_title(NEW.id_album);
        RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_sync_single_title_albumes_temas ON Albumes_Temas;
CREATE TRIGGER trg_sync_single_title_albumes_temas
AFTER INSERT OR UPDATE OR DELETE ON Albumes_Temas
FOR EACH ROW EXECUTE FUNCTION trg_albumes_temas_sync_single_title();

-- 3. Trigger sobre Temas: si se actualiza el título de un tema, actualizar los singles vinculados
CREATE OR REPLACE FUNCTION trg_temas_sync_single_title()
RETURNS TRIGGER AS $$
DECLARE
    r RECORD;
BEGIN
    IF NEW.titulo_tema IS DISTINCT FROM OLD.titulo_tema THEN
        FOR r IN SELECT DISTINCT id_album FROM Albumes_Temas WHERE id_tema = NEW.id_tema LOOP
            PERFORM fn_sync_single_title(r.id_album);
        END LOOP;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_sync_single_title_temas ON Temas;
CREATE TRIGGER trg_sync_single_title_temas
AFTER UPDATE OF titulo_tema ON Temas
FOR EACH ROW EXECUTE FUNCTION trg_temas_sync_single_title();

-- 4. Ejecución inicial para sincronizar todos los singles existentes
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN SELECT id_album FROM Albumes WHERE id_tipo_album = 1 LOOP
        PERFORM fn_sync_single_title(r.id_album);
    END LOOP;
END;
$$;
