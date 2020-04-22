(function(){var _ = Package.underscore._,
    package_name = "project",
    namespace = "project";

if (package_name != "project") {
    namespace = TAPi18n.packages[package_name].namespace;
}
TAPi18n.languages_available_for_project["es"] = ["Spanish (Spain)","Español"];
if(_.isUndefined(TAPi18n.translations["es"])) {
  TAPi18n.translations["es"] = {};
}

if(_.isUndefined(TAPi18n.translations["es"][namespace])) {
  TAPi18n.translations["es"][namespace] = {};
}

_.extend(TAPi18n.translations["es"][namespace], {"ui":{"welcome to spyfall":"Bienvenido a Spyfall","new game":"Nuevo Juego","join game":"Únete a un Juego","waiting for players":"Esperando Jugadores...","access code":"Código de Acceso","join my spyfall game":"Únete a mi Juego de Spyfall!","start game":"Empezar Juego","leave game":"Salir del Juego","show hide":"mostrar/ocultar","you are the spy":"Usted es el espía!","you are not the spy":"Usted <strong> no </strong> es el spía!","the location":"La ubicación","your role":"Su papel","players":"Jugadores","first":"1<span>st</span>","location reference":"Lugar de Referencia","end game":"Terminar Juego","enter your name":"Ingrese su nombre","create game":"Crear","back":"Atrás","enter an access code":"Introduzca un código de acceso","invalid access code":"Lo sentimos , no hay juegos con el código de acceso que ha proporcionado!","join":"Unirse","footer":"<a href='http://international.hobbyworld.ru/catalog/25-spyfall/' target='_blank'>Spyfall</a> diseñado por Alexandr Ushan, publicado por <a href='http://international.hobbyworld.ru/' target='_blank'>Hobby World</a>"},"locations":{"airplane":"Avión","bank":"Banco","beach":"Playa","cathedral":"Catedral","circus tent":"Carpa de Circo","corporate party":"Fiesta de la Empresa","crusader army":"Ejército Medieval","casino":"Casino","day spa":"Spa / Balneario Matutino","embassy":"Embajada","hospital":"Hospital","hotel":"Hotel","military base":"Base Militar","movie studio":"Estudio de película","ocean liner":"Crucero Marítimo","passenger train":"Tren de Pasajeros","pirate ship":"Barco pirata","polar station":"Estación Polar","police station":"Estación de Policía","restaurant":"Restaurante","school":"Escuela","service station":"Estación de Servicio Automotriz","space station":"Estación Espacial","submarine":"Submarino","supermarket":"Supermercado","theater":"Teatro","university":"Universidad","world war ii squad":"Pelotón de la Segunda Guerra Mundial","roles":{"airplane":{"first class passenger":"Pasajero de Primera Clase","air marshall":"Encargado de Seguridad Aerea","mechanic":"Mecánico","air hostess":"Azafata","copilot":"Copiloto","captain":"Capitán","economy class passenger":"Pasajero de Clase Económica"},"bank":{"armored car driver":"Conductor de Vehiculo Blindado","manager":"Gerente","consultant":"Consultor","robber":"Ladrón","security guard":"Guardia de Seguridad","teller":"Cajero","customer":"Cliente"},"beach":{"beach waitress":"Camarera en la Playa","kite surfer":"Surfista con Cometa / Kite Surfer","lifeguard":"Salvavidas","thief":"Ladrón","beach photographer":"Fotógrafo en la Playa","ice cream truck driver":"Conductor de Camión de Helados","beach goer":"Vacacionista"},"cathedral":{"priest":"Sacerdote","beggar":"Mendigo","sinner":"Pecador","tourist":"Turista","sponsor":"Patrocinador","chorister":"Cantante del Coro","parishioner":"Feligrés"},"circus tent":{"acrobat":"Acróbata","animal trainer":"Entrenador de Animales","magician":"Mago","fire eater":"Tragafuegos","clown":"Payaso","juggler":"Malabarista","visitor":"Visitante"},"corporate party":{"entertainer":"Animador","manager":"Gerente","unwanted guest":"Invitado no Deseado","owner":"Dueño","secretary":"Secretaria","delivery boy":"Mensajero","accountant":"Contador"},"crusader army":{"monk":"Monje","imprisoned saracen":"Sarraceno Encarcelado","servant":"Sirviente","bishop":"Obispo","squire":"Escudero","archer":"Arquero","knight":"Caballero"},"casino":{"bartender":"Barman","head security guard":"Jefe de Seguridad","bouncer":"Guardia de Seguridad","manager":"Gerente","hustler":"Estafador","dealer":"Repartidor","gambler":"Apostador"},"day spa":{"stylist":"Estilista","masseuse":"Masajista","manicurist":"Manicurista","makeup artist":"Especialista en Maquillaje","dermatologist":"Dermatóloga","beautician":"Cultora de belleza","customer":"Cliente"},"embassy":{"security guard":"Guardia de Seguridad","secretary":"Secretaria","ambassador":"Embajador","tourist":"Turista","refugee":"Refugiado","diplomat":"Diplomático","government official":"Oficial del Gobierno"},"hospital":{"nurse":"Enfermera","doctor":"Doctor","anesthesiologist":"Anestesiólogo ","intern":"Interno","therapist":"Terapeuta","surgeon":"Cirujano","patient":"Paciente"},"hotel":{"doorman":"Portero","security guard":"Guardia de Seguridad","manager":"Gerente","housekeeper":"Mucama","bartender":"Barman ","bellman":"Botones","customer":"Cliente"},"military base":{"deserter":"Desertor","colonel":"Coronel","medic":"Médico","sniper":"Francotirador","officer":"Oficial","tank engineer":"Ingeniero de Tanques","soldier":"Soldado"},"movie studio":{"stunt man":"Doble de riesgo","sound engineer":"Ingeniero de Sonido","camera man":"Camarógrafo","director":"Director","costume artist":"Cosmetóloga","producer":"Productor","actor":"Actor"},"ocean liner":{"cook":"Cocinero","captain":"Capitán ","bartender":"Barman","musician":"Músico","waiter":"Mesero","mechanic":"Mecánico","rich passenger":"Pasajero Adinerado"},"passenger train":{"mechanic":"Mecánico","border patrol":"Guardia Fronterizo","train attendant":"Personal del tren","restaurant chef":"Chef","train driver":"Conductor de tren","stoker":"Fogonero","passenger":"Pasajero"},"pirate ship":{"cook":"Cocinero","slave":"Esclavo","cannoneer":"Cañonero","tied up prisoner":"Prisionero Atado","cabin boy":"Grumete / Mozo de Cubierta","brave captain":"Valiente Capitan","sailor":"Marinero"},"polar station":{"medic":"Médico","expedition leader":"Líder de Expedición","biologist":"Biólogo","radioman":"Operador de Radio","hydrologist":"Hidrólogo","meteorologist":"Meteorólogo","geologist":"Geólogo"},"police station":{"detective":"Detective","lawyer":"Abogado","journalist":"Reportero","criminalist":"Criminalista ","archivist":"Archivista","criminal":"Criminal","patrol officer":"Patrullero "},"restaurant":{"musician":"Músico","bouncer":"Guardia de Seguridad","hostess":"Afitriona / Hostess","head chef":"Chef Principal","food critic":"Crítico de Comida","waiter":"Mesero","customer":"Cliente"},"school":{"gym teacher":"Instructor de Gimnasia","principal":"Director","security guard":"Guardia de Seguridad","janitor":"Conserje","cafeteria lady":"Señora de la Cafetería","maintenance man":"Conserje","student":"Estudiante"},"service station":{"manager":"Gerente","tire specialist":"Especialista en Neumáticos","biker":"Ciclista","car owner":"Automovilista","car wash operator":"Operador de Lavado de Autos","electrician":"Electricista","auto mechanic":"Mecánico Automotriz"},"space station":{"engineer":"Ingeniero","alien":"Extraterreste","pilot":"Piloto","commander":"Comandante","scientist":"Científico","doctor":"Doctor","space tourist":"Turista Espacial"},"submarine":{"cook":"Cocinero","commander":"Comandante","sonar technician":"Técnico de Sonar","electronics technician":"Técnico en Electrónica","radioman":"Operador de Radio","navigator":"Navegante","sailor":"Marinero"},"supermarket":{"cashier":"Cajero","butcher":"Carnicero","janitor":"Conserje","security guard":"Guardia de Seguridad","food sample demonstrator":"Demostradora de Comida","shelf stocker":"Acomodador de Mercancia","customer":"Cliente"},"theater":{"coat check lady":"Encargada de Guardarropa","prompter":"Apuntador","cashier":"Cajero","director":"Director","actor":"Actor","crew man":"Personal de apoyo","audience member":"Espectador"},"university":{"graduate student":"Graduado","professor":"Profesor","dean":"Decano","psychologist":"Psicólogo","maintenance man":"Encargado de Mantenimiento","janitor":"Conserje","student":"Estudiante"},"world war ii squad":{"resistance fighter":"Soldado de la Resistencia","radioman":"Operador de Radio","scout":"Explorador","medic":"Médico","cook":"Cocinero","imprisoned nazi":"Nazi Encarcelado","soldier":"Soldado"}}}});

})();
