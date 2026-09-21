-- Permitir SELECT público en storage.buckets para que la API de storage resuelva getBucket y listBuckets
DROP POLICY IF EXISTS "Public read for buckets" ON storage.buckets;
CREATE POLICY "Public read for buckets"
ON storage.buckets FOR SELECT
USING (true);
