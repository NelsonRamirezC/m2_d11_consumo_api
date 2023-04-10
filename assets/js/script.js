$(() => {

    $("#formulario").submit(function(event){
        event.preventDefault();
        let pokemon = $("#pokemon").val();
        buscarPokemon(pokemon);

    })


    function buscarPokemon(pokemon){
        let urlApi = "https://pokeapi.co/api/v2/pokemon/"+pokemon

        $.ajax({
            type: "GET",
            url: urlApi,
            dataType: "json",
            success: function (response) {
                $("#nombrePokemon").text(response.name);
                $("#pesoPokemon").text(response.weight + " Libras.");
                $("#alturaPokemon").text(response.height + " pies.");
                $("#experienciaPokemon").text(response.base_experience);

                console.log(response.stats);

                const initialValue = 0;
                const total = response.stats.reduce(
                    (accumulator, currentValue) => accumulator + currentValue.base_stat,
                    initialValue
                );

                let stats = response.stats.map(element => {

                    let dato = {
                        y: (element.base_stat*100/total).toFixed(2),
                        label: element.stat.name
                    }
                    return dato;
                })

                //console.log(stats)
                dibujarGrafico(stats);
            }
        });
    }


    function dibujarGrafico(stats){
        var chart = new CanvasJS.Chart("chartContainer", {
            theme: "light2", // "light1", "light2", "dark1", "dark2"
            exportEnabled: true,
            animationEnabled: true,
            title: {
                text: "Desktop Browser Market Share in 2016"
            },
            data: [{
                type: "pie",
                startAngle: 25,
                toolTipContent: "<b>{label}</b>: {y}%",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label} - {y}%",
                dataPoints: stats
            }]
        });
        chart.render();
        
    }



})