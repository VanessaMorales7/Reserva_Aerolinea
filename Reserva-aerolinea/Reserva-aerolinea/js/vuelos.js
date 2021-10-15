const flightA1 = {
  origin: "Medellín",
  destiny: "Cartagena",
  hour: new Date(2021, 12, 21, 17),
  cost: 500000,
  bookings: []
};
const flightA2 = {
  origin: "Barranquilla",
  destiny: "Santa Marta",
  hour: new Date(2021, 11, 21, 18),
  cost: 450000,
  bookings: []
};
const flightA3 = {
  origin: "Cartagena",
  destiny: "Barranquilla",
  hour: new Date(2021, 11, 20, 3, 0, 0, 200),
  cost: 600000,
  bookings: []
};
const flightA4 = {
  origin: "Bogotá",
  destiny: "Medellín",
  hour: new Date(2021, 11, 28, 6, 50),
  cost: 550000,
  bookings: [1078]
};
const flightA5 = {
  origin: "San Andres",
  destiny: "Rionegro",
  hour: new Date(2021, 11, 1, 19, 30),
  cost: 200000,
  bookings: []
};


const app = new function() {

  this.init = function() {
    document.getElementById('registros').removeAttribute('visible', '');
    document.getElementById('registros').setAttribute('hidden', '');
    document.getElementById('btnback').removeAttribute('visible', '');
    document.getElementById('btnback').setAttribute('hidden', '');
  }

  this.flights = [flightA1, flightA2, flightA3, flightA4, flightA5];
  this.showFlights = function() {
    let data = '<br>';
    if (this.flights.length > 0) {
      for (i = 0; i < this.flights.length; i++) {
        data += '<tr>';
        data += '<th scope="row">'+ (i+1) +'</th>';
        data += '<td>'+ this.flights[i].origin + '</td>';
        data += '<td>'+ this.flights[i].destiny + '</td>';
        data += '<td>'+ this.flights[i].hour.toLocaleString() + '</td>';
        data += '<td>'+ new Intl.NumberFormat('es-CO', {style: "currency", currency: "COP", minimumSignificantDigits: '2'}).format(this.flights[i].cost) + '</td>';
        data += '<td><button class="btn-danger btn-reserv" onclick="app.reserve(' + i + ')">Reservar</button></td>'; 
        data += '</tr>';
      }
    }
    document.getElementById('flights').innerHTML = data;
    document.getElementById('flights').style.display = 'contents';
    document.getElementById('header-fligths').style.display = 'contents';
    document.getElementById('content').setAttribute('hidden', '');
    document.getElementById('registros').removeAttribute('hidden', '');
    document.getElementById('registros').setAttribute('visible', '');
    document.getElementById('btnback').removeAttribute('hidden', '');
    document.getElementById('btnback').setAttribute('visible', '');
  };

  this.reserve = function (item) {
    const el = document.getElementById('document');
    document.getElementById('document').value = "";
    document.getElementById('flightsData').style.display = 'block';
    document.getElementById('flights').style.display = 'none';
    document.getElementById('header-fligths').style.display = 'none';
    document.getElementById('menu1').style.display = 'none';
    document.getElementById('menu2').style.display = 'none';
    document.getElementById('btnback').removeAttribute('hidden', '');
    document.getElementById('btnback').setAttribute('visible', '');
    document.getElementById('content').removeAttribute('hidden', '');

    const tax = this.flights[item].costobase == this.flights[item].costoneto ? '' : 'impuesto mañana y/o fin de semana'; 
    document.getElementById('flightsData').innerHTML = "VUELO # " + (item + 1) + ":<br>ORIGEN: " + this.flights[item].origin + '<br>DESTINO: ' + this.flights[item].destiny + '<br>SALIDA: ' + this.flights[item].hour.toLocaleString() + '<br>PRECIO BASE: $' + this.flights[item].cost + " " + tax;
    document.getElementById('identification').style.display = 'block';
    self = this;
    document.getElementById('reserva-edit').onsubmit = function() {
      let d = el.value * 1;
      if (isNaN(d) || d == 0) {
        swal("Error", "Ingrese un dato correcto", "error"); /*Modify*/
      }else{
        let flag = false;
        for (j = 0; j < self.flights.length; j++) {
          const auxDoc = self.flights[j].bookings.indexOf(d)
          if (auxDoc != -1) {
            if (self.flights[j].hour.getFullYear() == self.flights[item].hour.getFullYear() &&
              self.flights[j].hour.getMonth() == self.flights[item].hour.getMonth() &&
              self.flights[j].hour.getDate() == self.flights[item].hour.getDate()) {
              flag = true;
              break;
            }
          }
        }
        if (flag) {
          swal("Error", "Usted ya tiene reservado un vuelo para esta fecha", "error");
        }else{
          self.flights[item].bookings.push(d);
          swal("","Vuelo reservado correctamente", "success");
          document.getElementById('menu1').style.display = 'block';
          document.getElementById('menu2').style.display = 'block';
          document.getElementById('flightsData').style.display = 'none';
          document.getElementById('identification').style.display = 'none';
          document.getElementById('btnback').removeAttribute('visible', '');
          document.getElementById('btnback').setAttribute('hidden', '');
        }
      }
    }
  };

  this.getReservation = function () {
    const el = document.getElementById('getById');
    const d = el.value * 1;
    if (isNaN(d) || d == 0) {
        swal("Error","Ingrese un dato correcto", "error");
    }else{
      var data = '<br>VUELOS RESERVADOS DE ' + d;
      for (i = 0; i < this.flights.length; i++) {
        var auxDoc = this.flights[i].bookings.indexOf(d)
        if (auxDoc != -1) {
          data += '<tr>';
          data += '<td>Vuelo # '+ (i+1) + "= ORIGEN: " + this.flights[i].origin + ', DESTINO: ' + this.flights[i].destiny + ', SALIDA: ' + this.flights[i].hour.toLocaleString() + '</td>';
          data += '</tr>';
        }
      }
      if (data == '<br>VUELOS RESERVADOS DE ' + d) {
        swal("Error","No existen vuelos asociados a dicho documento", "error");
      }else{
        document.getElementById('menu1').style.display = 'none';
        document.getElementById('menu2').style.display = 'none';
        document.getElementById('flights').style.display = 'block';
        document.getElementById('header-fligths').style.display = 'none';
        document.getElementById('flights').innerHTML = data;
        document.getElementById('btnback').style.display = 'block';
        document.getElementById('content').setAttribute('hidden', '');
        document.getElementById('btnback').removeAttribute('hidden', '');
        document.getElementById('btnback').setAttribute('visible', '');
      }
    }
  };

  this.return = function (){
    document.getElementById('flightsData').style.display = 'none';
    document.getElementById('identification').style.display = 'none';
    document.getElementById('flights').style.display = 'none';
    document.getElementById('header-fligths').style.display = 'none';
    document.getElementById('btnback').removeAttribute('visible', '');
    document.getElementById('btnback').setAttribute('hidden', '');
    document.getElementById('menu1').style.display = 'block';
    document.getElementById('menu2').style.display = 'block';
    document.getElementById('getById').value = "";
    document.getElementById('content').removeAttribute('hidden', '');
    document.getElementById('content').setAttribute('visible', '');
  };
}

