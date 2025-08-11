import React, { useState } from 'react';
import { Search, Music, Users, Album, Calendar, MapPin, Filter, Play } from 'lucide-react';

const CumbiaDatabase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('search');
  const [filters, setFilters] = useState({
    año: '',
    region: '',
    sello: '',
    genero: '',
    instrumento: ''
  });
  const [results, setResults] = useState([]);

  // Datos de ejemplo
  const mockData = {
    grupos: ['Los Destellos', 'Los Mirlos', 'Juaneco y su Combo', 'Los Diablos Rojos'],
    cantantes: ['Pepe Vásquez', 'Chacalón', 'Lorenzo Palacios'],
    sellos: ['Infopesa', 'Virrey', 'Sono Radio', 'MAG'],
    regiones: ['Lima', 'Iquitos', 'Pucallpa', 'Tarapoto', 'Chiclayo'],
    generos: ['Cumbia amazónica', 'Cumbia andina', 'Cumbia psicodélica', 'Cumbia tropical']
  };

  const searchCategories = [
    { id: 'grupos', label: 'Grupos', icon: Users },
    { id: 'cantantes', label: 'Cantantes', icon: Music },
    { id: 'compositores', label: 'Compositores', icon: Album },
    { id: 'guitarristas', label: 'Guitarristas', icon: Play },
    { id: 'temas', label: 'Temas', icon: Music }
  ];

  const handleSearch = () => {
    // Simulación de búsqueda
    const mockResults = [
      {
        tipo: 'Grupo',
        nombre: 'Los Destellos',
        info: 'Grupo de cumbia psicodélica de Lima',
        albums: 8,
        periodo: '1968-1982'
      },
      {
        tipo: 'Tema',
        nombre: 'Guajira Sicodélica',
        grupo: 'Los Destellos',
        album: 'Cumbia Sideral',
        año: 1970
      }
    ];
    setResults(mockResults);
  };

  const ResultCard = ({ result }) => (
    <div className="bg-white p-4 rounded-lg shadow-md border border-orange-200 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg text-orange-800">{result.nombre}</h3>
        <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-sm font-medium">
          {result.tipo}
        </span>
      </div>
      <p className="text-gray-600 mb-2">{result.info}</p>
      <div className="text-sm text-gray-500">
        {result.albums && <span>• {result.albums} álbumes</span>}
        {result.periodo && <span> • Periodo: {result.periodo}</span>}
        {result.grupo && <span> • Grupo: {result.grupo}</span>}
        {result.año && <span> • Año: {result.año}</span>}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-orange-800 mb-2">
            Base de Datos Cumbia Peruana
          </h1>
          <p className="text-orange-600">1968 - 2005 • La historia de la cumbia peruana</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center mb-6 bg-white rounded-lg p-2 shadow-md">
          {['search', 'browse', 'timeline', 'map'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={px-4 py-2 m-1 rounded-lg font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-orange-500 text-white'
                  : 'text-orange-600 hover:bg-orange-100'
              }}
            >
              {tab === 'search' && 'Búsqueda'}
              {tab === 'browse' && 'Explorar'}
              {tab === 'timeline' && 'Cronología'}
              {tab === 'map' && 'Mapa'}
            </button>
          ))}
        </div>

        {activeTab === 'search' && (
          <div className="max-w-4xl mx-auto">
            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="flex gap-4 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar grupos, cantantes, temas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Buscar
                </button>
              </div>

              {/* Search Categories */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
                {searchCategories.map((category) => (
                  <button
                    key={category.id}
                    className="flex items-center justify-center gap-2 p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors text-orange-700"
                  >
                    <category.icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{category.label}</span>
                  </button>
                ))}
              </div>

              {/* Filters */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <select
                  value={filters.año}
                  onChange={(e) => setFilters({...filters, año: e.target.value})}
                  className="p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Todos los años</option>
                  <option value="1968-1975">1968-1975</option>
                  <option value="1976-1985">1976-1985</option>
                  <option value="1986-1995">1986-1995</option>
                  <option value="1996-2005">1996-2005</option>
                </select>

                <select
                  value={filters.region}
                  onChange={(e) => setFilters({...filters, region: e.target.value})}
                  className="p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Todas las regiones</option>
                  {mockData.regiones.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>

                <select
                  value={filters.sello}
                  onChange={(e) => setFilters({...filters, sello: e.target.value})}
                  className="p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Todos los sellos</option>
                  {mockData.sellos.map(sello => (
                    <option key={sello} value={sello}>{sello}</option>
                  ))}
                </select>

                <select
                  value={filters.genero}
                  onChange={(e) => setFilters({...filters, genero: e.target.value})}
                  className="p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Todos los géneros</option>
                  {mockData.generos.map(genero => (
                    <option key={genero} value={genero}>{genero}</option>
                  ))}
                </select>

                <select
                  value={filters.instrumento}
                  onChange={(e) => setFilters({...filters, instrumento: e.target.value})}
                  className="p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Todos los instrumentos</option>
                  <option value="guitarra">Guitarra</option>
                  <option value="bajo">Bajo</option>
                  <option value="bateria">Batería</option>
                  <option value="teclados">Teclados</option>
                </select>
              </div>
            </div>

            {/* Results */}
            {results.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-orange-800 mb-4">
                  Resultados ({results.length})
                </h2>
                {results.map((result, index) => (
                  <ResultCard key={index} result={result} />
                ))}
              </div>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <div className="text-2xl font-bold text-orange-600">247</div>
                <div className="text-gray-600">Grupos</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <div className="text-2xl font-bold text-orange-600">1,432</div>
                <div className="text-gray-600">Temas</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <div className="text-2xl font-bold text-orange-600">186</div>
                <div className="text-gray-600">Álbumes</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <div className="text-2xl font-bold text-orange-600">38</div>
                <div className="text-gray-600">Años</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'browse' && (
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-orange-800 mb-4">Por Grupos</h3>
                <div className="space-y-2">
                  {mockData.grupos.map(grupo => (
                    <div key={grupo} className="p-2 hover:bg-orange-50 rounded cursor-pointer">
                      {grupo}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-orange-800 mb-4">Por Sellos</h3>
                <div className="space-y-2">
                  {mockData.sellos.map(sello => (
                    <div key={sello} className="p-2 hover:bg-orange-50 rounded cursor-pointer">
                      {sello}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-orange-800 mb-4">Por Región</h3>
                <div className="space-y-2">
                  {mockData.regiones.map(region => (
                    <div key={region} className="p-2 hover:bg-orange-50 rounded cursor-pointer">
                      {region}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-orange-800 mb-6">Cronología de la Cumbia Peruana</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-semibold">1968-1972: Los Pioneros</h3>
                <p className="text-gray-600">Los Destellos y el nacimiento de la cumbia psicodélica</p>
              </div>
              <div className="border-l-4 border-orange-400 pl-4">
                <h3 className="font-semibold">1973-1980: La Edad Dorada</h3>
                <p className="text-gray-600">Expansión de la cumbia amazónica con Los Mirlos</p>
              </div>
              <div className="border-l-4 border-orange-300 pl-4">
                <h3 className="font-semibold">1981-1990: Diversificación</h3>
                <p className="text-gray-600">Nuevos sonidos y la cumbia chicha</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CumbiaDatabase;