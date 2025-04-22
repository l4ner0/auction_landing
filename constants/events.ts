export const eventType = new Map<string, string>([
  ['HAND_OVER', 'Puesta en mano'],
  ['AUCTION', 'Subasta'],
])
export const eventStatus = new Map<string, { name: string; color: string }>([
  ['PUBLISHED', { name: 'Publicado', color: 'blue' }],
  ['COMPLETED', { name: 'Completado', color: 'blue' }],
  ['CANCELLED', { name: 'Cancelado', color: 'red' }],
  ['CREATED', { name: 'Creado', color: 'purple' }],
  ['FINISHED', { name: 'Finalizado', color: 'brown' }],
  ['IN_DEBATE', { name: 'En debate', color: 'orange' }],
  ['IN_PROGRESS', { name: 'En progreso', color: 'orange' }],
  ['READY_TO_PUBLISH', { name: 'Listo para publicar', color: 'green' }],
])
export const eventTimes = new Map<string, string>([
  ['8', '8:00'],
  ['9', '9:00'],
  ['10', '10:00'],
  ['11', '11:00'],
  ['12', '12:00'],
  ['13', '13:00'],
  ['14', '14:00'],
  ['15', '15:00'],
  ['16', '16:00'],
  ['17', '17:00'],
])
export const goodType = new Map<string, string>([
  ['REAL_ESTATE', 'Inmuebles'],
  ['CARS_AND_MOTORCYCLES', 'Autos y motos'],
  ['TRUCKS_AND_BUSES', 'Camiones y buses'],
  [
    'CONSTRUCTION_AGRICULTURAL_MACHINERY',
    'Maquinaria de Construcción y/o Agrícola',
  ],
  ['SCRAP_MATERIAL', 'Chatarra, materiales y residuos'],
  ['INDUSTRIAL_MACHINERY_AND_EQUIPMENT', 'Industrial, maquinaria y equipo'],
])

