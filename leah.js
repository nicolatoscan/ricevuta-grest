const costi = {
    all: {
        orario1: { primoFiglio: 240, secondoFiglio: 170, NRFiglio: 340 },
        orario2: { primoFiglio: 250, secondoFiglio: 180, NRFiglio: 360 },
        orario3: { primoFiglio: 260, secondoFiglio: 185, NRFiglio: 370 },
        orario4: { primoFiglio: 140, secondoFiglio: 100, NRFiglio: 200 }
    },
    weekly: {
        orario1: { primoFiglio: 65, secondoFiglio: 45, NRFiglio: 95  },
        orario2: { primoFiglio: 70, secondoFiglio: 50, NRFiglio: 100 },
        orario3: { primoFiglio: 75, secondoFiglio: 55, NRFiglio: 105 },
        orario4: { primoFiglio: 40, secondoFiglio: 30, NRFiglio: 55  }
    }
}

function getCosti(orario, isAllWeeks) {
    return isAllWeeks ? costi.all[orario] : costi.weekly[orario]
}

function calcola() {
    document.querySelectorAll('.prezzo').forEach(x => x.innerHTML = "--");
    let isAllWeeks = false;
    let weeks = document.querySelectorAll('.week');
    const allWeeks = document.querySelector('.week-all');
    if (allWeeks.querySelector('.settimana')?.checked) {
        weeks = [allWeeks]
        isAllWeeks = true;
        // selectWeek(true);
    } else {
        // selectWeek(false);
    }
    let result = 0;
    for (const w of weeks) {
        let weekResult = 0;
        const selected = w.querySelector('.settimana').checked
        if (selected) {
            const orario1 = w.querySelector('.orario1').checked
            const orario2 = w.querySelector('.orario2').checked
            const orario3 = w.querySelector('.orario3').checked
            const orario4 = w.querySelector('.orario4').checked
            const pulmino = w.querySelector('.pul').checked
            const primoFiglio = w.querySelector('.I').checked
            const secondoFiglioN = w.querySelector('.II select').options[w.querySelector('.II select').selectedIndex].text
            const NRFiglioN = w.querySelector('.NR select').options[w.querySelector('.NR select').selectedIndex].text
            const costo = getCosti(
                orario1 ? 'orario1' : orario2 ? 'orario2' : orario3 ? 'orario3' : orario4 ? 'orario4' : '',
                isAllWeeks
            )
            
            if (costo) {
                if (primoFiglio) {
                    weekResult += costo.primoFiglio
                }
                if (secondoFiglioN > 0) {
                    weekResult += costo.secondoFiglio * secondoFiglioN
                }
                if (NRFiglioN > 0) {
                    weekResult += costo.NRFiglio * NRFiglioN
                }
            }

            if (pulmino) {
                weekResult += (isAllWeeks ? 20 : 10) * (+NRFiglioN + (+secondoFiglioN) + (primoFiglio ? 1 : 0))
            }

            result += weekResult;
        }
        w.querySelector('.prezzo').innerHTML = weekResult <= 0 ? "--" : (weekResult.toFixed(2) + " €")
    }
    const numeroTessere = document.querySelector('#numero-tessere').options[document.querySelector('#numero-tessere').selectedIndex].text
    if (numeroTessere > 0) {
        const costoTessera = 10 * numeroTessere
        document.querySelector('.tessera-noi-line .prezzo').innerHTML = costoTessera.toFixed(2) + " €"
        result += costoTessera
    }
    document.querySelector('.totale').innerHTML = result <= 0 ? "--" : (result.toFixed(2) + " €")
}

function selectWeek(isFull) {
    if (isFull) {
        document.querySelectorAll(".week input[type='checkbox']").forEach(x => x.checked = false);
    } else {
        document.querySelectorAll(".week-all input[type='checkbox']").forEach(x => x.checked = false);
    }
}

function clear(allWeeks) {
    const classLine = allWeeks ? "week" : "week-all"
    const checkboxes = document.querySelectorAll(`.${classLine} input[type='checkbox']`)
    const radios = document.querySelectorAll(`.${classLine} input[type='radio']`)
    const selects = document.querySelectorAll(`.${classLine} select`)
    checkboxes.forEach(x => x.checked = false);
    radios.forEach(x => x.checked = false);
    selects.forEach(x => x.selectedIndex = 0)
}

document.querySelectorAll("input[type='checkbox'], input[type='radio'], select").forEach(x => {
    x.addEventListener("change", () => {
        console.log("Calcola");
        const line = x.closest("tr")
        if (line.querySelector('.settimana')) {
            line.querySelector('.settimana').checked = true
            if (line.classList.contains("week-all")) {
                clear(true)
            } else {
                clear(false)
            }
        }
        calcola()
    });
});

document.querySelectorAll("input[type='radio']").forEach(x => {
    x.addEventListener("change", () => {
        calcola();
    });
});

function clearAll() {
    const checkboxes = document.querySelectorAll(`input[type='checkbox']`)
    const radios = document.querySelectorAll(`input[type='radio']`)
    const text = document.querySelectorAll(`input[type='text']`)
    const selects = document.querySelectorAll(`select`)
    checkboxes.forEach(x => x.checked = false);
    radios.forEach(x => x.checked = false);
    text.forEach(x => x.value = '');
    selects.forEach(x => x.selectedIndex = 0);

    document.querySelectorAll('#pagato').forEach(x => x.checked = false);
    document.querySelectorAll('#note').forEach(x => x.value = '');

    calcola();
}

function stampa() {
    print()
    const ricevuta = document.querySelector('#n-ricevuta')
    ricevuta.value = parseInt(ricevuta?.value) + 1
}