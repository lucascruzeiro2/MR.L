function search() {
    let input = document.getElementById('barra-pesquisa').value.toLowerCase();
    let x = document.getElementsByClassName('cartao');
  
    for (let i = 0; i < x.length; i++) {
      let titulo = x[i].getElementsByTagName('h4')[0].innerText.toLowerCase();
      if (titulo.includes(input)) {
        x[i].style.display = 'block';
      } else {
        x[i].style.display = 'none';
      }
    }
  
    if (input === '') {
      let allcartaos = document.getElementsByClassName('cartao');
      for (let i = 0; i < allcartaos.length; i++) {
        allcartaos[i].style.display = 'block';
      }
    }
  }
  
  function exibirDetalhesProduto(id) {
    window.location.href = 'detalhes.html?id=' + id;
  }


class MobileNavbar {
    constructor(mobileMenu, navList, navLinks) {
      this.mobileMenu = document.querySelector(mobileMenu);
      this.navList = document.querySelector(navList);
      this.navLinks = document.querySelectorAll(navLinks);
      this.activeClass = "active";
  
      this.handleClick = this.handleClick.bind(this);
    }
  
    animateLinks() {
      this.navLinks.forEach((link, index) => {
        link.style.animation
          ? (link.style.animation = "")
          : (link.style.animation = `navLinkFade 0.5s ease forwards ${
              index / 7 + 0.3
            }s`);
      });
    }
  
    handleClick() {
      this.navList.classList.toggle(this.activeClass);
      this.mobileMenu.classList.toggle(this.activeClass);
      this.animateLinks();
    }
  
    addClickEvent() {
      this.mobileMenu.addEventListener("click", this.handleClick);
    }
  
    init() {
      if (this.mobileMenu) {
        this.addClickEvent();
      }
      return this;
    }
  }
  
  const mobileNavbar = new MobileNavbar(
    ".mobile-menu",
    ".nav-lista",
    ".nav-lista li",
  );
  mobileNavbar.init();


  // carrosel:

  const slider = document.querySelectorAll('.slider');
const btnPrev = document.getElementById('prev-button');
const btnNext = document.getElementById('next-button');

let currentSlide = 0;

function hideSlider() {
  slider.forEach(item => item.classList.remove('on'))
}

function showSlider() {
  slider[currentSlide].classList.add('on')
}

function nextSlider() {
  hideSlider()
  if(currentSlide === slider.length -1) {
    currentSlide = 0
  } else {
    currentSlide++
  }
  showSlider()
}

function prevSlider() {
  hideSlider()
  if(currentSlide === 0) {
    currentSlide = slider.length -1
  } else {
    currentSlide--
  }
  showSlider()
}

btnNext.addEventListener('click', nextSlider)
btnPrev.addEventListener('click', prevSlider)

  
  fetch('https://diwserver.vps.webdock.cloud/products/category/Apparel - Topwear')
    .then(res => res.json())
    .then(data => {
      let str = '';
      for (let i = 0; i <= 4; i++) {
        let ver = data.products[i];
        let titulo = data.products[i].title
        str += `<div class="cartao">
                  <img class="img-cartao" src="${ver.image}" alt="${ver.id}">
                  <h4> <a href="#">${titulo.length > 20 ? titulo.substring(0,19).concat('...'):titulo}</a> </h4>
                  <h5>R$${ver.price}</h5>
                  <h6> ${ver.baseColour} </h6>
                  <button onclick="exibirDetalhesProduto(${ver.id})">Detalhes</button>
                </div>`;
      }
      document.getElementById('produtos').innerHTML = str;
    });
  
    fetch('https://diwserver.vps.webdock.cloud/products/category/Personal Care - Fragrance')
    .then(res => res.json())
    .then(data => {
      let str = '';
      for (let i = 0; i <= 4; i++) {
        let ver = data.products[i];
        let titulo = data.products[i].title
        str += `<div class="cartao">
                  <img class="img-cartao" src="${ver.image}" alt="${ver.id}">
                  <h4> <a href="#">${titulo.length > 20 ? titulo.substring(0,19).concat('...'):titulo}</a> </h4>
                  <h5>R$${ver.price}</h5>
                  <h6> ${ver.baseColour} </h6>
                  <button onclick="exibirDetalhesProduto(${ver.id})">Detalhes</button>
                </div>`;
      }
      document.getElementById('produtos2').innerHTML = str;
    });

    fetch('https://diwserver.vps.webdock.cloud/products/category/Apparel - Innerwear')
    .then(res => res.json())
    .then(data => {
      let str = '';
      for (let i = 0; i <= 4; i++) {
        let ver = data.products[i];
        let titulo = data.products[i].title
        str += `<div class="cartao">
                  <img class="img-cartao" src="${ver.image}" alt="${ver.id}">
                  <h4> <a href="#">${titulo.length > 20 ? titulo.substring(0,19).concat('...'):titulo}</a> </h4>
                  <h6> ${ver.baseColour} </h6>
                  <h5>R$${ver.price}</h5>
                  <button onclick="exibirDetalhesProduto(${ver.id})">Detalhes</button>
                </div>`;
      }
      document.getElementById('produtos3').innerHTML = str;
    });





 async function fetchAllProductsByCategory(category) {
    let page = 1; 
    let products = []; 
  
    while (true) {
      const response = await fetch(`https://diwserver.vps.webdock.cloud/products/category/${category}?page=${page}`);
      const data = await response.json();
  
      if (data.products.length > 0) {
       
        products = products.concat(data.products);
      } else {
        
        break;
      }
  
      if (data.nextPage) {
      
        page++;
      } else {
      
        break;
      }
    }
  
    return products;
  }
  

  async function fetchAndDisplayFilteredProducts(category, elementId) {
    const products = await fetchAllProductsByCategory(category);
  
    let str = '';
    for (let i = 0; i < products.length; i++) {
      let ler = products[i];
      let titulo = ler.title;
      str += `<div class="cartao">
                <img class="img-cartao" src="${ler.image}" alt="${ler.id}">
                <h4> <a href="#">${titulo.length > 20 ? titulo.substring(0, 19).concat('...') : titulo}</a> </h4>
                <h5>R$${ler.price}</h5>
                <button onclick="exibirDetalhesProduto(${ler.id})">Detalhes</button>
              </div>`;
    }
  
  
    document.getElementById(elementId).innerHTML = '';
  
 
    document.getElementById(elementId).innerHTML = str;
  }
  

  function handleCategoryFilterChange() {
    const category = document.getElementById('categoryFilter').value;
    if (category === 'All') {
      fetchAndDisplayFilteredProducts('Apparel - Topwear', 'produtos');
      fetchAndDisplayFilteredProducts('Personal Care - Fragrance', 'produtos2');
      fetchAndDisplayFilteredProducts('Apparel - Innerwear', 'produtos3');
    } else {
      fetchAndDisplayFilteredProducts(category, 'produtos');
      document.getElementById('produtos2').innerHTML = '';
      document.getElementById('produtos3').innerHTML = '';
    }
  }
  

  document.getElementById('categoryFilter').addEventListener('change', handleCategoryFilterChange);
  
  fetchAndDisplayFilteredProducts('Apparel - Topwear', 'produtos');
  fetchAndDisplayFilteredProducts('Personal Care - Fragrance', 'produtos2');
  fetchAndDisplayFilteredProducts('Apparel - Innerwear', 'produtos3');