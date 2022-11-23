'use strict';
(function (window, document) {


const storageName = 'formdata';
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
      const formHtml = document.getElementById('form-list');
      
      let data = getStorage(storageName);
      let formList = data.formlist;
     
      let table = ``;
      
    
      for(let i=0; i<formList.length; i++){
        let form = formList[i];
        table += `<tr><td>${form.email || 'N/A'}</td><td>${form.created || 'N/A'}</td><td>${form.message || 'N/A'}</td></tr>`;
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
        const elements = document.forms["contact"].elements;
        let data = {}
        data['created'] = new Date();
        let error = false;
        
        for (let i=0; i<elements.length; i++){
            
            
            if(elements[i].value == "" || elements[i].value == null){
                elements[i].classList.add("error");
                error = true;
            }else{
              elements[i].classList.remove("error");
              data[elements[i].getAttribute('name')] = elements[i].value;
            }
            
            
            if(elements[i].getAttribute('name') == 'email'){
              if( /(.+)@(.+){2,}\.(.+){2,}/.test(elements[i].value) == false){
                elements[i].classList.add("error");
                error = true;
              } 
            }
            
        }   
        console.log(data);
     
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


window["Form"] = form();

if (typeof module == 'object' && typeof module.exports == 'object') {
        module.exports = form();
    }

})(window, document);