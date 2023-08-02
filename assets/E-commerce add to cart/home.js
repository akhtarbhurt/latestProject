var products = [
    {
        id: 1,
        name: 'Green Baccoli',
        image: 'https://emart.wpthemedemos.com/grocery-outlet/wp-content/uploads/sites/19/2023/05/capsicum-001.webp',
        price: 10
    },
    {
        id: 2,
        name: 'Orange',
        image: 'https://emart.wpthemedemos.com/grocery-outlet/wp-content/uploads/sites/19/2023/05/orange-01.webp',
        price: 20
    },
    {
        id: 3,
        name: 'Crunchy Bread',
        image: 'https://emart.wpthemedemos.com/grocery-outlet/wp-content/uploads/sites/19/2023/05/bread-01.webp',
        price: 30
    },
    {
        id: 4,
        name: 'Capsicum Green',
        image: 'https://emart.wpthemedemos.com/grocery-outlet/wp-content/uploads/sites/19/2023/05/brocoli-01.webp',
        price: 40
    },

];

let mark = document.getElementById('mark')
let search = document.querySelector('.search')
let openSearchh = document.getElementById('openSearch')

openSearchh.addEventListener('click', () => {
    search.classList.remove('active')
})

mark.addEventListener('click', () => {
    search.classList.add('active')
})

let li = document.querySelectorAll('li')
let submenu = document.querySelectorAll('.sub-menu')
li.forEach((list) => {
    list.addEventListener('click', function () {
        submenu.forEach((menu) => {
            menu.classList.toggle('block')
        })
    })
})

let navbar = document.querySelector('.navbar')

navbar.addEventListener('click', () => {
    let ul = document.querySelector('ul')
    ul.classList.add('openAnimate')
    ul.classList.remove('closeAnimate')
})

let closeMenu = document.querySelector('.close')

closeMenu.addEventListener('click', () => {
    document.querySelector('ul').classList.add('closeAnimate')
    document.querySelector('ul').classList.remove('openAnimate')
})

let closeCart = document.getElementById('closeCart')
let openCart = document.getElementById('openCart')

openCart.addEventListener('click', () => {
    document.querySelector('.side-cart').classList.add('openSideCart')
    document.querySelector('.side-cart').classList.remove('closeCart')

})

closeCart.addEventListener('click', () => {
    document.querySelector('.side-cart').classList.add('closeCart')
    document.querySelector('.side-cart').classList.remove('openSideCart')



})

let content = document.querySelectorAll('.cart-content')

content.forEach((contents) => {

    let plus = contents.querySelector('.plus');
    let minus = contents.querySelector('.minus');
    let input = contents.querySelector('input');
    let price = contents.querySelector('.price');
    let totalPrice = parseInt(price.innerHTML);
    totalPrice.innerHTML = price.innerHTML
    plus.addEventListener('click', () => {
        let previousValue = parseInt(price.innerHTML);
        totalPrice += previousValue;
        input.value = parseInt(input.value) + 1;
    });

    minus.addEventListener('click', () => {

        let previousValue = parseInt(price.innerHTML);
        if (totalPrice - previousValue >= 0) {
            totalPrice -= previousValue;
        } else {
            totalPrice = 0;
        }

        if (input.value <= 1) {
            input.value = 1;
        } else {
            input.value = parseInt(input.value) - 1;
        }

    });

    let btn = contents.querySelector('.cart')
    let tbody = document.querySelector('tbody')
    let totalAmounts = [0, 0, 0, 0]
    let shopCart = document.querySelector('.shop-cart')
    btn.addEventListener('click', (e) => {
        Swal.fire(
            'Good job!',
            'Your Product Successfully Added In Cart!',
            'success'
        )
        const id = e.target
        var html = document.createElement('tr')
        let productIndex;
        if (id.classList.contains('step1')) {
            productIndex = 0
            totalAmounts[0] = products[0].price * input.value;
            html.innerHTML = ` 

                    <td><img src="${products[0].image}" class="cart-image img-fluid" alt="" style="width: 70px;"> <span class="name mx-3 text-muted ">${products[0].name}</span> </td>
                    <td class="cprice pt-4">${products[0].price}</td>
                    <td class="quantity pt-4">${input.value}</td>
                    <td class="pt-4 cart-price">${totalAmounts[0]}</td>
                    <td class="delete"> <i class="fa-solid  fa-xmark" id="delete" ></i> </td>
                `

        }
        else if (id.classList.contains('step2')) {
            productIndex = 1
            totalAmounts[1] = products[1].price * input.value;
            html.innerHTML = `   
                    <td><img src="${products[1].image}" class="cart-image img-fluid" alt="" style="width: 70px;"> <span class="name mx-3 text-muted ">${products[1].name}</span> </td>
                    <td class="cprice pt-4">${products[1].price}</td>
                    <td class="quantity pt-4">${input.value}</td>
                    <td class="pt-4 cart-price">${totalAmounts[1]}</td>
                    <td class="delete"> <i class="fa-solid  fa-xmark" id="delete" ></i> </td>
                `

        }
        else if (id.classList.contains('step3')) {
            productIndex = 2
            totalAmounts[2] = products[2].price * input.value;
            html.innerHTML = `   
                    <td><img src="${products[2].image}" class="cart-image img-fluid" alt="" style="width: 70px;"> <span class="name mx-3 text-muted ">${products[2].name}</span> </td>
                    <td class="cprice pt-4">${products[2].price}</td>
                    <td class="quantity pt-4">${input.value}</td>
                    <td class=" pt-4 cart-price">${totalAmounts[2]}</td>
                    <td class="delete"> <i class="fa-solid  fa-xmark" id="delete" ></i> </td>
                `

        }
        else if (id.classList.contains('step4')) {
            productIndex = 3
            totalAmounts[3] = products[3].price * input.value;
            html.innerHTML = `   
                    <td><img src="${products[3].image}" class="cart-image img-fluid" alt="" style="width: 70px;"> <span class="name mx-3 text-muted ">${products[3].name}</span> </td>
                    <td class="cprice pt-4">${products[3].price}</td>
                    <td class="quantity pt-4">${input.value}</td>
                    <td class="pt-4 cart-price">${totalAmounts[3]}</td>
                    <td class="delete"> <i class="fa-solid  fa-xmark" id="delete" ></i> </td>
                `
        }

        const existingRow = tbody.querySelector(`tr[data-product="${productIndex}"]`);

        if (existingRow) {
            Swal.fire(
                'Successful!',
                'Your Product Has Been Updated Successfuly!',
                'success',
            )
            const quantityCell = existingRow.querySelector('.quantity');
            const priceCell = existingRow.querySelector('.cart-price');
            const quantity = parseInt(input.value);
            const totalPrice = products[productIndex].price * (quantity);

            quantityCell.textContent = quantity;
            priceCell.textContent = totalPrice;
        } else {
            var html = document.createElement('tr');
            html.dataset.product = productIndex;
            const totalAmount = products[productIndex].price * input.value;
            html.innerHTML = `   
                <td><img src="${products[productIndex].image}" class="cart-image img-fluid" alt="" style="width: 70px;"> <span class="name mx-3 text-muted ">${products[productIndex].name}</span> </td>
                <td class="cprice pt-4">${products[productIndex].price}</td>
                <td class="quantity pt-4">${input.value}</td>
                <td class="pt-4 cart-price">${totalAmount}</td>
                <td class="delete"> <i class="fa-solid  fa-xmark" id="delete" ></i> </td>
              `;

            tbody.appendChild(html)
            let removeItem = html.querySelector('.delete')
            removeItem.addEventListener('click', () => {
                html.remove()
                let tr = document.querySelectorAll('tr')

                shopCart.innerHTML = tr.length - 1


                shopCart.innerHTML = tr.length - 1
                let arr = [0]
                let cart = document.querySelectorAll('.cart-price')
                Array.from(cart).forEach((carts) => {
                    arr.push(parseInt(carts.innerHTML))

                })
                let newArr = arr.reduce((sum, total) => {
                    return sum - total

                })
                document.querySelector('.tprice').textContent = Math.abs(newArr)
                window.localStorage.setItem('store', tbody.innerHTML)

                window.localStorage.setItem('price', Math.abs(newArr))

            })

        }
        window.localStorage.setItem('store', tbody.innerHTML)
        let tr = document.querySelectorAll('tr')

        shopCart.innerHTML = tr.length - 1
        let arr = []
        let cart = document.querySelectorAll('.cart-price')
        Array.from(cart).forEach((carts) => {
            arr.push(parseInt(carts.innerHTML))
        })
        let newArr = arr.reduce((sum, total) => {
            return sum + total
        })
        document.querySelector('.tprice').textContent = newArr

        window.localStorage.setItem('price', Math.abs(newArr))

        document.querySelector('.total').style.display = "block"


    })
})

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 150) {
        document.querySelector('nav').classList.add('fixed')
    } else {
        document.querySelector('nav').classList.remove('fixed')
    }
})



let ingredient = document.querySelectorAll('.ingredient')

ingredient.forEach((ingrediens) => {
    let checkbox = ingrediens.querySelector('.checkbox')
    let text = ingrediens.querySelector('.text')

    checkbox.addEventListener('click', () => {
        text.classList.toggle('para')
        checkbox.classList.toggle('green')
    })
})

