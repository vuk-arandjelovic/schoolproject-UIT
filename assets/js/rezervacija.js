'use strict';
(function (window, document) {


const storageName = 'rezervacija';
const setStorage = (name, data) => {  window.localStorage.setItem(name, JSON.stringify(data));}
const getStorage = (name) => { return window.localStorage.getItem(name) != undefined ? JSON.parse(window.localStorage.getItem(name)) : {}}
const appendForm = (data) => { 
  let tmpData = getStorage(storageName);
  let list = tmpData.formlist != undefined ? tmpData.formlist : [];
  list.push(data);
  setStorage(storageName, {formlist: list})
}    


const form = () => {
    
    const load = () => {
      const formHtml = document.getElementById('reservations-list');
      
      let data = getStorage(storageName);
      let formList = data.formlist;
     
      let table = ``;
      
    
      for(let i=0; i<formList.length; i++){
        let form = formList[i];
        table += `<tr><td>${form.email || 'N/A'}</td><td>${form.phone || 'N/A'}</td><td>${form.movie || 'N/A'}</td><td>${form.time || 'N/A'}</td><td>${form.tickets || 'N/A'}</td></tr>`;
      }
     
      formHtml.innerHTML = table;
      
      document.querySelector('#remove').addEventListener('click', ()=>{
        setStorage(storageName, {formlist: []});
        window.location.reload();
      });      
        
    }
    const initForm = () => {
    const submit = document.querySelector("#submit");
    
    submit.addEventListener("click", () => {
        const elements = document.forms["rezervacija"].elements;
        let data = {}
        let error = false;
        let rbError = true;
        
        for (let i=0; i<elements.length; i++){
            
            
            if(elements[i].value == "" || elements[i].value == null){
                elements[i].classList.add("error");
                error = true;
            }else{
                if(elements[i].getAttribute('name') == "time"){
                    continue;
                }
                elements[i].classList.remove("error");
                data[elements[i].getAttribute('name')] = elements[i].value;
            }
            
            
            if(elements[i].getAttribute('name') == 'email'){
              if( /(.+)@(.+){2,}\.(.+){2,}/.test(elements[i].value) == false){
                elements[i].classList.add("error");
                error = true;
              } 
            }
            if(elements[i].getAttribute('name') == 'phone'){
                if( /\+3816\d\/\d{2}-\d{2}-\d{3}/.test(elements[i].value) == false){
                  elements[i].classList.add("error");
                  error = true;
                } 
            }
            if(elements[i].getAttribute('name') == 'movie'){
                if(elements[i].value === "0"){
                    elements[i].classList.add("error");
                    error = true;
                }
            }
            const radioButtons = document.querySelectorAll("[name='time']");
            for(const rb of radioButtons){
                if(rb.checked){
                    document.querySelector(".radio-polja").classList.remove("error")
                    rbError = false;           
                    data["time"] = rb.value;
                    break;
                }else{
                    document.querySelector(".radio-polja").classList.add("error")
                }
            }
        }
        
        console.log(data);
        if(rbError){
            alert("Molimo odaberite vreme");
            return
        }
        if(error){
          return;
        }
        else{
          alert("Uspešno ste popunili formu.");
        }
        appendForm(data);
        
    });
    }
    
    return { initForm, load }
    
};


window["Reservation"] = form();

if (typeof module == 'object' && typeof module.exports == 'object') {
        module.exports = form();
    }

})(window, document);