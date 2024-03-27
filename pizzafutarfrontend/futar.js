document.addEventListener("DOMContentLoaded", function() {
    const createButton = document.getElementById("create");
    const readButton = document.getElementById("read");
    const updateButton = document.getElementById("update");
    const selectButton = document.getElementById("select");
    //const dolgozoForm = document.getElementById("dolgozoForm");
    //const dolgozoDiv = document.getElementById("ugyfellista");
    
    createButton.addEventListener("click", async function(){
        let fazon = document.getElementById("fazon").value;
        let baseUrl='http://localhost/pizzafutar/index.php?futar/'+fazon;
        const formdata= new FormData(document.getElementById("dolgozoForm")); 
        let options={
            method: "POST",
            mode: "cors",
            body: formdata
        };
        let response= await fetch(baseUrl, options);
    });
    updateButton.addEventListener("click", async function(){
        let baseUrl='http://localhost/pizzafutar/index.php?futar/'+fazon;
        let object={
            fazon: document.getElementById("fazon").value,
            fnev: document.getElementById("fnev").value,
            ftel: document.getElementById("ftel").value
        };
        let body=JSON.stringify(object);
        let options={
            method: "PUT",
            mode: "cors",
            body: body
        };
        let response= await fetch(baseUrl, options);
    });
    readButton.addEventListener("click", async function(){
        let baseUrl="http://localhost/pizzafutar/index.php?futar";
        let options={
            method: "GET",
            mode: "cors"
        };
        let response= await fetch(baseUrl, options);
        if(response.ok){
            let data= await response.json();
            futarokListazasa(data);
        }
        else{
            console.error("Hiba a szerver válaszában!");
        }
    });
    function futarokListazasa(futarok){
        let futarDiv= document.getElementById("futarlista");
        let tablazat = futarFejlec();
        for(let futar of futarok){
            tablazat+= futarSor(futar);
        }
        futarDiv.innerHTML = tablazat+"</tbody> </table>";
    }
    function futarSor(futar){
        let sor=`<tr>
                    <td>${futar.fazon}</td>
                    <td>${futar.fnev}</td>
                    <td>${futar.ftel}</td>
                    <td>
                        <button type="button" class="btn btn-outline-success" id="select" onclick="adatBetoltes(${futar.fazon}, '${futar.fnev}', '${futar.ftel}')" ><i class="fa-regular fa-hand-pointer"></i></button>
                        <button type="button" class="btn btn-outline-danger" id="delete" onclick="adatTorles(${futar.fazon})" ><i class="fa-solid fa-trash"></i></button>
                    </td>
                </tr>`;
        return sor;
    }
    function futarFejlec(){
        let fejlec=`<table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Azonosító</th>
                                <th>Név</th>
                                <th>Telefonszám</th>
                                <th>Művelet</th>
                            </tr>
                        </thead>
                        <tbody>`;
        return fejlec;
    }
});
function adatBetoltes(fazon, fnev, ftel){
    let baseUrl='http://localhost/pizzafutar/index.php?futar/'+fazon;
    let options={
        method: "GET",
        mode: "cors"
    };
    let response= fetch(baseUrl, options);
    document.getElementById("fazon").value=fazon;
    document.getElementById("fnev").value=fnev;
    document.getElementById("ftel").value=ftel;
    response.then(function(response){
        if(response.ok){
            let data= response.json();
        }
        else{
            console.error("Hiba a szerverben!");
        }
    });
}
function adatTorles(fazon){
    let baseUrl='http://localhost/pizzafutar/index.php?futar/'+fazon;
    let options={
        method: "DELETE",
        mode: "cors"
    };
    let response= fetch(baseUrl, options);
    response.then(function(response){
        if(response.ok){
            let data= response.json();
        }
        else{
            console.error("Hiba a szerverben!");
        }
    });
}