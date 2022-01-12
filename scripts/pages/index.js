
   
   async function getPhotographers() {
        
    const response = await fetch('./data/photographers.json', {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
        });
    const photographers = await response.json()
    return photographers;
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };


    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
        const {media} =await getPhotographers();
        if(!localStorage.getItem('media')){
            localStorage.setItem('media', JSON.stringify(media));
        }
       
        
    };
    
    init();
    
    