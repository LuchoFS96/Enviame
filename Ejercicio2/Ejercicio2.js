function maxLimitWithCarrierService(values, json, event) {
  // Previene que se recargue la pagina.
  event.preventDefault();
  let result = {};
  // Recorro las llaves de mi objeto.
  for (let key in json.data) {
    let maxLimitIndex = 0;
    let maxLimit = 0;
    for (let i = 0; i < json.data[key].length; i++) {
      // Guardo tanto la posicion como el valor del mayor limite.
      if (maxLimit < json.data[key][i].limit) {
        maxLimitIndex = i;
        maxLimit = json.data[key][i].limit;
      }
    }
    // Termino de armar como necesite a mi objeto resultante.
    result[key] = { limit: json.data[key][maxLimitIndex].limit };
    result[key].over =
      values[json.data[key][maxLimitIndex].over_carrier_service_id];
    result[key].under =
      values[json.data[key][maxLimitIndex].under_carrier_service_id];
  }
  // Modifico el HTML para mostrar el resultado.
  document.getElementById("label").innerHTML = JSON.stringify(
    result,
    undefined,
    2
  );
  return result;
}

function maxServiceLocation(values, json, event) {
  // Prevengo que se recargue la pagina.
  event.preventDefault();
  let maxLimitLocation = "";
  let maxLimitLocationAux = 0;
  for (let key in json.data) {
    for (let i = 0; i < json.data[key].length; i++) {
      // Recorro las props de mi objeto para encontrar el servicio.
      if (maxLimitLocationAux < json.data[key][i].limit) {
        maxLimitLocationAux = json.data[key][i].limit;
        maxLimitLocation = key;
      }
    }
  }
  // Modifico el HTML para mostrar el resultado.
  document.getElementById("label").innerHTML = JSON.stringify(
    maxLimitLocation +
      ": Tiene " +
      maxLimitLocationAux +
      " servicios disponibles",
    undefined,
    2
  );
  return maxLimitLocation;
}

function mostServiceUsed(values, json, event) {
  // Prevengo que se recargue la pagina.
  event.preventDefault();
  let aux = {};
  let service = "";
  let max = 0;
  // Armo mi objeto con el nombre del servicio, la cantidad de veces que se usan y los identificadores de cada uno.
  for (let key in values) {
    if (!Object.keys(aux).length) {
      aux[values[key].service] = { id: [parseInt(key)], count: 0 };
    } else if (!aux[values[key].service]) {
      aux[values[key].service] = { id: [parseInt(key)], count: 0 };
    } else {
      aux[values[key].service].id.push(parseInt(key));
    }
  }
  // Cuento la cantidad de veces que se uso cada servicio.
  for (let key in json.data) {
    for (let i = 0; i < json.data[key].length; i++) {
      for (let auxKey in aux) {
        if (
          aux[auxKey].id.includes(json.data[key][i].over_carrier_service_id) ||
          aux[auxKey].id.includes(json.data[key][i].under_carrier_service_id)
        ) {
          aux[auxKey].count++;
        }
      }
    }
  }
  // Guardo el servicio más utilizado.
  for (let key in aux) {
    if (aux[key].count > max) {
      max = aux[key].count;
      service = key;
    }
  }
  // Modifico el HTML para mostrar el resultado.
  document.getElementById("label").innerHTML = JSON.stringify(
    service +
      " es usado por " +
      max +
      " localidades (Por mas que tenga distintos carriers)",
    undefined,
    2
  );
  return service;
}
