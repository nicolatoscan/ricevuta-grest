function calcola() {
    document.querySelector('.prezzo').innerHTML = "--"
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
            const giorno = w.querySelector('.giorno').checked
            const pomeriggio = w.querySelector('.pomeriggio').checked
            const primoFiglio = w.querySelector('.I').checked
            const secondoFiglioN = w.querySelector('.II select').options[w.querySelector('.II select').selectedIndex].text
            const NRFiglioN = w.querySelector('.NR select').options[w.querySelector('.NR select').selectedIndex].text
            if (giorno) {
                if (primoFiglio) {
                    weekResult += 64
                }
                if (secondoFiglioN > 0) {
                    weekResult += 47.50 * secondoFiglioN
                }
                if (NRFiglioN > 0) {
                    weekResult += 95 * NRFiglioN
                }
            } else if (pomeriggio) {
                if (primoFiglio) {
                    weekResult += 23.5
                }
                if (secondoFiglioN > 0) {
                    weekResult += 17.5 * secondoFiglioN
                }
                if (NRFiglioN > 0) {
                    weekResult += 35 * NRFiglioN
                }
            }
            if (isAllWeeks) {
                weekResult *= 5;
            }
            result += weekResult;
        }
        w.querySelector('.prezzo').innerHTML = weekResult <= 0 ? "--" : (weekResult.toFixed(2) + " €")
    }
    if (document.querySelector('.tessera-noi').checked) {
        result += 6
        document.querySelector('.tessera-noi-line .prezzo').innerHTML = "6.00 €"
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
    selects.forEach(x => x.selectedIndex = 0)
    console.log(text);
}