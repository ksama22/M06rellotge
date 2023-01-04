
class Clock {
    constructor(hora, minut, segon) {
        this.hora = hora;
        this.minut = minut;
        this.segon = segon;
        this.sentit = true //true: endavant; false: endarrere
        this.estat = false //true: arrencat; false: aturat
        this.ref = 0; //és la referència que retorna setInterval
    };

    default() {
        this.hora = new Date().getHours();
        this.minut = new Date().getMinutes();
        this.segon = new Date().getSeconds();
        this.sentit = true //true: endavant; false: endarrere
        this.estat = false //true: arrencat; false: aturat
        this.ref = null; //és la referència que retorna setInterval
    }

    formata() {
        //addCero('param') coloca un 0 davant el numero
        // ${variable}  pot crida una variable dins del un string
        return `${addCero(this.hora)}:${addCero(this.minut)}:${addCero(this.segon)}`;
    }

    playPause() {
        if (this.estat) {
            //Si esta arrencat, es para
            this.atura();
            this.estat = false;
        } else {
            //Si esta parat, arrenca
            if (this.sentit) {
                // si el sentit es 'true' ho fa cap endavant
                this.arrenca();
            } else {
                // si el sentit es 'false' ho fa cap enrere
                this.enrere();
            }

            this.estat = true;
        }
    }

    arrenca() {
        //Para si existeix un Interval
        this.atura();
        this.estat = true;
        //La referenci es el interval
        this.ref = setInterval(() => {
            this.segon++;
            if (this.segon == 60) {
                this.segon = 0;
                this.minut += 1;
                if (this.minut == 60) {
                    this.minut = 0;
                    this.hour += 1;
                    if (this.hour == 24) {
                        this.hour = 0;
                    }
                }

            }
            //  document.getElementById(div).innerHTML = this.formata();
        }, 1000);

    };

    enrere() {
        this.atura();
        this.ref = setInterval(() => {
            this.segon--;
            if (this.segon == -1) {
                this.segon = 59;
                this.minut -= 1;
                if (this.minut == -1) {
                    this.minut = 59;
                    this.hour -= 1;
                    if (this.hora == -1) {
                        this.hora == 23;
                    }
                }
            }
            // document.getElementById(div).innerHTML = this.formata();
        }, 1000);
    }
    atura() {
        clearInterval(this.ref);
    };

    reset() {
        this.hora = 0;
        this.minut = 0;
        this.segon = 0;
        this.atura();
    }
};

//Treu una captura de pantalla del rellotge
function lapTime() {
    document.getElementById("lapmarca").innerText = clock1.formata();
}

//Segons si 'estat' esta 'corrent' posa play o pause
function twiceClockStat() {
    clock1.playPause();
}

function enrererellotge() {
    return clock2.sentit = false;
}



function resetAllClocks() {
    clock1 = new Clock();
    clock1.default();
    clock2 = new Clock(0, 0, 0);
    // 'sentit' a 'false' = cap enrere 
    clock2.sentit = false;
    clock3 = new Clock(0, 5, 0);
}

function laprellotge() {
    clock1.lap();
}

function addSeconds(rellotgeOBJ) {
    rellotgeOBJ.segon++;
    if (rellotgeOBJ.segon == 60) {
        rellotgeOBJ.segon = 0;
        rellotgeOBJ.minut += 1;
        if (rellotgeOBJ.minut == 60) {
            rellotgeOBJ.minut = 0;
            rellotgeOBJ.hour += 1;
        }
    }
    //document.getElementById("rellotge1").innerHTML = rellotge.formata();
}

function subtractSeconds(rellotgeOBJ) {
    rellotgeOBJ.segon--;
    if (rellotgeOBJ.segon == -1) {
        rellotgeOBJ.segon = 59;
        rellotgeOBJ.minut -= 1;
        if (rellotgeOBJ.minut == -1) {
            rellotgeOBJ.minut = 59;
            rellotgeOBJ.hour -= 1;
        }
    }
    //document.getElementById("rellotge1").innerHTML = rellotge.formata();
}

function addCero(num = 0) {
    if (num < 10) {
        return "0" + num;
    } else {
        return num.toString();
    }
}

// Crea una funcio en bucle cada segon, on kevin la mira
let kevinVigila = setInterval(() => {
    callEverySecond();
}, 1000);


//Primer rellotge amb l'hora actual
let clock1 = new Clock();
clock1.default();
//Segon rellotge amb valors 00:00:00
let clock2 = new Clock(0, 0, 0);
//Tercer rellotge amb valors 00:05:00
let clock3 = new Clock(0, 5, 0);

//Cada segon que es cridi la funcio, actualitza el text
function callEverySecond() {
    document.getElementById("rellotge1").innerText = clock1.formata();
    document.getElementById("rellotge2").innerText = clock2.formata();
    document.getElementById("rellotge3").innerText = clock3.formata();
}
