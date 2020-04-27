const locations = [
  {
    ID: 0,
    InternalID: 7,
    MainStreet: "Av. Maxico",
    SecondStreet: "Av. 30 de Marzo",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 1,
    InternalID: 212,
    MainStreet: "Av. Abraham Lincoln",
    SecondStreet: "Av. Bolivar",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 2,
    InternalID: 101,
    MainStreet: "Av. Luperon",
    SecondStreet: "Guarocuya",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 3,
    InternalID: 503,
    MainStreet: "Av. Maximo Gomez",
    SecondStreet: "Av. Pedro Livio Cedeño",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 4,
    InternalID: 702,
    MainStreet: "Av. Mexico",
    SecondStreet: "Dr. Delgado",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 5,
    InternalID: 703,
    MainStreet: "Av. Mexico",
    SecondStreet: "Palacio Nacional (Entrada)",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 6,
    InternalID: 704,
    MainStreet: "Av. Mexico",
    SecondStreet: "30 de Marzo",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 7,
    InternalID: 619,
    MainStreet: "Av. Independencia",
    SecondStreet: "Av. Pasteur",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 8,
    InternalID: 710,
    MainStreet: "Av. 27  de Febrero",
    SecondStreet: "30 de Marzo",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 9,
    InternalID: 129,
    MainStreet: "Av. Luperon",
    SecondStreet: "Av. Caonabo",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 10,
    InternalID: 609,
    MainStreet: "Cesar Nicolas Penson",
    SecondStreet: "Leopoldo Navarro",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 11,
    InternalID: 121,
    MainStreet: "Av. Romulo Betancourt",
    SecondStreet: "Av. Caonabo",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 12,
    InternalID: 207,
    MainStreet: "Av. Jimenez Moya",
    SecondStreet: "Av. Romulo Betancourt",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 13,
    InternalID: 308,
    MainStreet: "Av. Abraham Lincoln",
    SecondStreet: "Max Henriquez Ureña",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 14,
    InternalID: 312,
    MainStreet: "Av. Tiradentes",
    SecondStreet: "Hector Homero Hernandez",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 15,
    InternalID: 102,
    MainStreet: "Av. Luperon",
    SecondStreet: "Av. Gustavo Mejia Ricart",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 16,
    InternalID: 324,
    MainStreet: "Av. Lope de Vega",
    SecondStreet: "Dr. Rafael A. Sanchez",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 17,
    InternalID: 130,
    MainStreet: "Av. Luperon",
    SecondStreet: "Exterior 1ra (Libertador)",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 18,
    InternalID: 305,
    MainStreet: "Av. Abraham Lincoln",
    SecondStreet: "Dr. Jacinto Mañon",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 19,
    InternalID: 730,
    MainStreet: "Av. José Martí",
    SecondStreet: "Paris",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 20,
    InternalID: 732,
    MainStreet: "Av. 27  de Febrero",
    SecondStreet: "Av. José Martí",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 21,
    InternalID: 731,
    MainStreet: "Av. 27  de Febrero",
    SecondStreet: "Av. Duarte",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 22,
    InternalID: 735,
    MainStreet: "Av. Duarte",
    SecondStreet: "Ana Valverde",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 23,
    InternalID: 736,
    MainStreet: "Av. Duarte",
    SecondStreet: "Baltazar de los Reyes",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 24,
    InternalID: 723,
    MainStreet: "Av. José Martí",
    SecondStreet: "Ravelo",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 25,
    InternalID: 726,
    MainStreet: "Av. José Martí",
    SecondStreet: "Barahona",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 26,
    InternalID: 728,
    MainStreet: "Av. José Martí",
    SecondStreet: "Francisco Henriquez y Carvajal",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 27,
    InternalID: 712,
    MainStreet: "Av. 27  de Febrero",
    SecondStreet: "Juan de Morfa",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 28,
    InternalID: 711,
    MainStreet: "Av. 27  de Febrero",
    SecondStreet: "Barahona",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 29,
    InternalID: 722,
    MainStreet: "Av. Mexico",
    SecondStreet: "Jose Marti",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 30,
    InternalID: 729,
    MainStreet: "Av. Duarte",
    SecondStreet: "Paris",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 31,
    InternalID: 727,
    MainStreet: "Av. Duarte",
    SecondStreet: "Francisco Henriquez y Carvajal",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 32,
    InternalID: 725,
    MainStreet: "Av. Duarte",
    SecondStreet: "Barahona",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 33,
    InternalID: 720,
    MainStreet: "Av. Duarte",
    SecondStreet: "Ravelo",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 34,
    InternalID: 717,
    MainStreet: "Av. Duarte",
    SecondStreet: "Av. Mella",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 35,
    InternalID: 718,
    MainStreet: "Av. Duarte",
    SecondStreet: "Benito Gonzalez",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 36,
    InternalID: 719,
    MainStreet: "Av. Mexico",
    SecondStreet: "Av. Duarte",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 37,
    InternalID: 701,
    MainStreet: "Av. Mexico",
    SecondStreet: "Galvan",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 38,
    InternalID: 716,
    MainStreet: "Barahona",
    SecondStreet: "Bartolome Colon",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 39,
    InternalID: 713,
    MainStreet: "Av. San Martin",
    SecondStreet: "Leopoldo Navarro",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 40,
    InternalID: 714,
    MainStreet: "Av. San Martin",
    SecondStreet: "Dr. Delgado",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 41,
    InternalID: 715,
    MainStreet: "Barahona",
    SecondStreet: "Maria de Toledo",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 42,
    InternalID: 901,
    MainStreet: "Laboratorio",
    SecondStreet: "Laboratorio",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 43,
    InternalID: 201,
    MainStreet: "Av. Winston Churchill",
    SecondStreet: "Av. Gustavo Mejia Ricart",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 44,
    InternalID: 301,
    MainStreet: "Euclides Morillo",
    SecondStreet: "Doctores Mallen",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 45,
    InternalID: 501,
    MainStreet: "Av. Maximo Gomez",
    SecondStreet: "San Juan de la Maguana",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 46,
    InternalID: 601,
    MainStreet: "Av. 27  de Febrero",
    SecondStreet: "Rosa Duarte",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 47,
    InternalID: 801,
    MainStreet: "S.E.F.A",
    SecondStreet: "PLaza de la Bandera",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 48,
    InternalID: 202,
    MainStreet: "Av. Winston Churchill",
    SecondStreet: "Dr. Rafael A. Sanchez",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 49,
    InternalID: 302,
    MainStreet: "Av. Los Proceres",
    SecondStreet: "Av. Abraham Lincoln (Euclides M.)",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 50,
    InternalID: 402,
    MainStreet: "Av. Ortega y Gasset",
    SecondStreet: "Av. Nicolas de Ovando",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 51,
    InternalID: 502,
    MainStreet: "Av. Maximo Gomez",
    SecondStreet: "Av. Nicolas de Ovando",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 52,
    InternalID: 602,
    MainStreet: "Av. Mexico",
    SecondStreet: "Rosa Duarte",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 53,
    InternalID: 802,
    MainStreet: "Francisco Fray Ramirez (Ant. HatueyJose Tapia Brea",
    SecondStreet: "Jose Tapia Brea",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 54,
    InternalID: 902,
    MainStreet: "Av. 27 de Febrero",
    SecondStreet: "Centro de Control",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 55,
    InternalID: 103,
    MainStreet: "Av. Gustavo Mejia Ricart",
    SecondStreet: "Palacio de los Deportes",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 56,
    InternalID: 203,
    MainStreet: "Av. Winston Churchill",
    SecondStreet: "Ing. Roberto Pastoriza",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 57,
    InternalID: 303,
    MainStreet: "Euclides Morillo",
    SecondStreet: "Lic. Juan Mejia y Cotes",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 58,
    InternalID: 403,
    MainStreet: "Av. Ortega y Gasset",
    SecondStreet: "Av. Pedro Livio Cedeño",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 59,
    InternalID: 603,
    MainStreet: "Av. Mexico",
    SecondStreet: "Pedro A. Lluberes",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  },
  {
    ID: 60,
    InternalID: 803,
    MainStreet: "Av. Los Proceres",
    SecondStreet: "Av. Republica de Argentina",
    Lattitude: 0,
    Longitude: 0,
    LocationID: 0,
  }
];
export default locations;
