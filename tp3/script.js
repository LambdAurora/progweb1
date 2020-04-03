// TP3, 1: Manipulation de tableaux
const tp3_array = [ 10, 15, 6, 14, 14, 13, 19, 10, 17, 9 ];
const array_form_submit = document.getElementById("array_submit");
const array_form_bool = document.getElementById("array_bool");
const array_form_invalid = document.getElementById("array_invalid");
const array_display_element = document.getElementById("array_display");

function display_array(array, bool) {
    if (typeof bool !== "boolean") {
        array_display_element.textContent = "Error: display_array(array, bool), expected a boolean for argument 'bool'.";
        array_display_element.classList.add("error_color");
        return;
    } else {
        array_display_element.classList.remove("error_color");
    }
    display_array_for(array, bool);
}

function display_array_for(array, bool) {
    let text = "";
    for (const value of array) {
        if (bool && value < 15)
            continue;
        text += `${value} `;
    }
    array_display_element.textContent = text;
}

function display_array_while(array, bool) {
    let text = "";
    let i = 0;
    while (array[i]) {
        if (!bool && array[i] < 15)
            continue;
        text += `${array[i]} `;
        i++;
    } 
    array_display_element.textContent = text;
}

array_form_submit.addEventListener("click", () => {
    let bool = array_form_bool.checked;
    let invalid = array_form_invalid.checked;

    if (invalid) {
        display_array(tp3_array, "uwu");
        return;
    }

    display_array(tp3_array, bool);
});

// TP3, 2: Conversion d'unités

// Entrée de conversion, initialement prévue pour un système avec spécification de l'unité de la valeur d'entrée
// suite à une mal compréhension du sujet.
// L'avantage est que ça permet d'être facilement extensible.
class ConversionEntry {
    constructor(source, target, callback) {
        this.source = source;
        this.target = target;
        this.callback = callback;
    }

    // Convertit la valeur.
    convert(input) {
        return this.callback(input);
    }

    // Vérifie que cette entrée correspond à l'unité source et l'unité cible spécifiées.
    is_valid(source, target) {
        return this.source === source && this.target === target;
    }
}

const conversion_form_submit = document.getElementById("conversion_submit");
const conversion_form_input = document.getElementById("conversion_input"); 
const conversion_form_target = document.getElementById("conversion_target");
const conversion_display_el = document.getElementById("conversion_display");
const conversion_table = [
    new ConversionEntry("cm", "inch", convert_cm_to_inch), 
    new ConversionEntry("inch", "cm", convert_inch_to_cm), 
    new ConversionEntry("pounds", "g", convert_pounds_to_g), 
    new ConversionEntry("g", "pounds", convert_g_to_pounds)
];

function convert_inch_to_cm(inches) {
    return inches * 2.54;
}

function convert_cm_to_inch(cm) {
    return cm / 2.54;
}

function convert_pounds_to_g(pounds) {
    return pounds * 453.6;
}

function convert_g_to_pounds(g) {
    return g / 453.6;
}

conversion_form_submit.addEventListener("click", () => {
    // On vérifie qu'il y a un nombre de spécifié.
    if (conversion_form_input.value === "") {
        conversion_display_el.textContent = "Error: please enter a value to convert.";
        conversion_display_el.classList.add("error_color");
        return;
    } else {
        conversion_display_el.classList.remove("error_color");
    }
    let input = parseFloat(conversion_form_input.value);
    let target = conversion_form_target.value;
    // On cherche l'entrée correspondante.
    let entry = conversion_table.find(entry => entry.target === target);
    if (entry)
        conversion_display_el.textContent = entry.convert(input).toString();
    else {
        conversion_display_el.textContent = "Error: target value is invalid or conversion table is incomplete.";
        conversion_display_el.classList.add("error_color");
    }
});
