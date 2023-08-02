let price = document.querySelector('.price')
let coupon = document.getElementById('coupon')
document.querySelector('#embed').innerHTML = localStorage.getItem('store')
price.innerHTML = localStorage.getItem('price')

let input = document.getElementById('input')
let clickCount;
document.getElementById('discount').addEventListener('click', () => {
  clickCount++
  
  if (input.value == "786521") {
    price.innerHTML /= 2
    Swal.fire(
      'Congrats!',
      'You Got 50% Discount !',
      'success',
    )
    window.localStorage.setItem('total', price.innerHTML)

    input.disabled = true;
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Your Coupon Code Is Wrong!'

    })
  }
})
coupon.addEventListener('click', () => {
  Swal.fire('Your Coupon Code is 786521')

})

