let submit = document.getElementById('submit')
console.log(input)
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'd30b814906msh3af80411a31f55bp1163a1jsn7d5732e6a0b2',
        'X-RapidAPI-Host': 'low-carb-recipes.p.rapidapi.com'
    }
};

let image = document.querySelector('.image')
let title = document.querySelector('.title')
let description = document.querySelector('.description')
let direction = document.querySelector('.direction')
let table = document.querySelectorAll('td')
let getRecipe = async () => {
    let input = document.getElementById('input').value
   
    const url = `https://low-carb-recipes.p.rapidapi.com/search?name=` + input;
    let ingredient = document.querySelector('.ingredient')
    let html = '';
    let html2 = '';
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        for (let element of result) {
            image.src = element.image
            title.innerHTML = element.name
            description.innerHTML = element.description
            table[0].innerHTML = element.nutrients.fat
            table[1].innerHTML = element.nutrients.protein
            table[2].innerHTML = element.nutrients.sugar
            table[3].innerHTML = element.nutrients.caloriesKCal
            table[4].innerHTML = element.nutrients.totalCarbs
            table[5].innerHTML = element.nutrients.transFat
            for (let insideElement of element.ingredients) {
                html += `
                <div >    
                    <p class=" mx-3 para"> <span class="circle"></span>  ${insideElement.name}</p>
                    <ol class="mt-2 mx-3">
                        <li> <strong> Equip: </strong> ${insideElement.servingSize.desc != undefined ? insideElement.servingSize.desc : 'Not Required'}  </li>
                        <li id="gram" > <strong> Grams: </strong> ${insideElement.servingSize.grams != undefined ? insideElement.servingSize.grams : 'Not Required'}  </li>
                    </ol>
                </div>
                `
            }
        }

        ingredient.innerHTML = html
        let list = document.createElement('li')
        for (let element of result) {
            list.innerHTML = element.steps
        }

        direction.appendChild(list)

    } catch (error) {
        console.error(error);
    }
}

let loader = document.querySelector('.loader')
let container = document.querySelector('.container')

submit.addEventListener('click', (e) => {
    e.preventDefault()
    getRecipe()
    
    loader.classList.add('active')
    container.classList.remove('active')
    setTimeout(() => {
        container.classList.add('active')
        loader.classList.remove('active')
    }, 3000);

    
})

window.addEventListener('scroll', ()=>{
    let fixed = document.querySelector('.fixed')
    let nav = document.querySelector('nav')
    let card = document.querySelector('.card')
    let screenWidth = window.innerWidth
    if(screenWidth >= 992){
        if(window.pageYOffset > 30){
                  card.classList.add('fixed')
        } else{
            card.classList.remove('fixed')       
        }
    } else{
        card.classList.remove('fixed')
    }
    
})