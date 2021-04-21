function incarcaPersoane(){
    let http = new XMLHttpRequest();
    let url = 'http://localhost:5678/resurse/persoane.xml';
    http.open("GET", url);
    http.send();
    http.onreadystatechange=(e)=>{
        let parser=new DOMParser();
        let xmlDoc=parser.parseFromString(http.responseText,"text/xml");
        let table ="<table><tr><td>Nume</td><td>Prenume</td><td>Varsta</td><td>Adresa</td><td>Ocupatie</td><td>Gen</td><td>E-mail</td><td>Telefon</td></tr>";
        let persoana=xmlDoc.getElementsByTagName("persoana");
        for(let i=0;i<persoana.length;++i){
            table+="<tr>";
            table+="<td>"+persoana[i].getElementsByTagName("nume")[0].childNodes[0].nodeValue+"</td>";
            table+="<td>"+persoana[i].getElementsByTagName("prenume")[0].childNodes[0].nodeValue+"</td>";
            table+="<td>"+persoana[i].getElementsByTagName("varsta")[0].childNodes[0].nodeValue+"</td>";

            let adresa="<td>";
            adresa+=persoana[i].getElementsByTagName("adresa")[0].getElementsByTagName("strada")[0].innerHTML + ", ";
            adresa+=persoana[i].getElementsByTagName("adresa")[0].getElementsByTagName("numar")[0].innerHTML + ", ";
            adresa+=persoana[i].getElementsByTagName("adresa")[0].getElementsByTagName("localitate")[0].innerHTML + ", ";
            adresa+=persoana[i].getElementsByTagName("adresa")[0].getElementsByTagName("judet")[0].innerHTML + ", ";
            adresa+=persoana[i].getElementsByTagName("adresa")[0].getElementsByTagName("tara")[0].innerHTML;
            adresa+="</td>";
            table+=adresa;

            table+="<td>"+persoana[i].getElementsByTagName("ocupatie")[0].childNodes[0].nodeValue+"</td>";
            table+="<td>"+persoana[i].getElementsByTagName("gen")[0].childNodes[0].nodeValue+"</td>";
            table+="<td>"+persoana[i].getElementsByTagName("e-mail")[0].childNodes[0].nodeValue+"</td>";
            table+="<td>"+persoana[i].getElementsByTagName("telefon")[0].childNodes[0].nodeValue+"</td>";

            table+="</tr>"
        }
        table+="</table>"
        document.getElementById("continut").innerHTML=table;
    }

}