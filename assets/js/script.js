//////////////////////////////////////////////////////
const alert = document.querySelector('#alert')
addEventListener('DOMContentLoaded', () => {
  alert.style.display = 'none'
  document.body.classList.remove('overflow')
})
//////////////////////////////////////////////////////

import { items } from './data.js';

////////////////////////////////////////////////////////
const navBar = document.querySelector('.navbar'),
  headerBgImage = document.querySelector('.header2'),
  prevBtn = document.querySelector('.prev'),
  nextBtn = document.querySelector('.next'),
  arrivalButton = document.querySelector('.arrival__button'),
  departureButton = document.querySelector('.departure__button'),
  overlay = document.querySelector('.overlay'),
  btnBackToTop = document.querySelector('.backtotop');

//////////////////////////////////////////////////////////
// Sticky nav
const header = document.querySelector('header');

function stickyNav(entries) {
  const [entry] = entries;

  !entry.isIntersecting ? navBar.classList.add('sticky') : navBar.classList.remove('sticky');
  // btnBackToTop.classList.add('show--button');
  // btnBackToTop.classList.remove('show--button');
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
});

headerObserver.observe(header);

// Menu fade animation
const handleHover = function (e) {
  if (
    e.target.classList.contains('nav__link') || e.target.classList.contains('nav--logo')
  ) {
    document.querySelectorAll('.nav__link').forEach((e2) => {
      if (e2 !== e.target) e2.style.opacity = this;
    });
    const navLogo = document.querySelector('.nav--logo');
    if (navLogo !== e.target) navLogo.style.opacity = this;
  }
};

// Mouse hover
navBar.addEventListener('mouseover', handleHover.bind(0.5));
navBar.addEventListener('mouseout', handleHover.bind(1));

// Nav Burger Menu
const navSlide = () => {
  const showMenu = document.querySelector('.burger'),
    navbarLinks = document.querySelector('.nav__links'),
    navLink = document.querySelectorAll('.nav__links li');

  const navSlideClasses = () => {
    navbarLinks.classList.toggle('nav-active');
    showMenu.classList.toggle('rotate');
    overlay.classList.toggle('show');
    document.body.classList.toggle('overflow');
  };

  showMenu.addEventListener('click', (e) => {
    navSlideClasses();

    navLink.forEach((e, index) => {
      if (e.style.animation) {
        e.style.animation = '';
      } else {
        e.style.animation = `linksFade 0.5s forwards ${index / 5 + 0.4}s`;
      }
    });
  });
  overlay.addEventListener('click', () => {
    navSlideClasses();
    navLink.forEach((e) => {
      e.style.animation = '';
    });
  });
};

navSlide();

//////////////////////////////////////////////////////////
// Header Background Image
const slider = () => {

  let imagesIndex = 0;

  const images = [
    './assets/images/airport1.jpg',
    './assets/images/airport2.jpg',
    './assets/images/airport3.jpg',
  ];

  const changeImage = (index) => {
    headerBgImage.style.backgroundImage = `linear-gradient(rgba(0,0,0,.3),rgba(0,0,0,.3)), url("${images[index]}")`;
  };

  const changeImageTimout = () => {
    imagesIndex < images.length - 1 ? imagesIndex++ : imagesIndex = 0;
    dotSlideActive();
    changeImage(imagesIndex);
    setTimeout(changeImageTimout, 9000);
  };

  const nextImage = () => {
    imagesIndex == images.length - 1 ? imagesIndex = 0 : imagesIndex++;
    dotSlideActive();
    changeImage(imagesIndex);
  }

  const prevImage = () => {
    imagesIndex === 0 ? imagesIndex = images.length - 1 : imagesIndex--;
    dotSlideActive();
    changeImage(imagesIndex);
  }

  // Next BG Image Button
  nextBtn.addEventListener('click', nextImage);

  // Previous BG Image Button
  prevBtn.addEventListener('click', prevImage);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') nextImage();
    if (e.key === 'ArrowRight') prevImage();
  });

  // Create dots
  const dotSlide = () => {
    const dots = document.querySelector('.dots');

    images.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      dot.setAttribute('id', 'dot' + i);
      dots.appendChild(dot);
    });
  };

  dotSlide();

  // Active dot current bgimage
  const dotSlideActive = () => {
    const dot = document.querySelectorAll('.dot');

    dot.forEach((e, i) => {
      e.classList.remove('active__dot');

      e.addEventListener('click', () => {
        imagesIndex = i;
        changeImage(imagesIndex);
        dotSlideActive();
      });
    });

    document.querySelector(`#dot${imagesIndex}`).classList.add('active__dot');
  };

  dotSlideActive();

  changeImageTimout();
};

slider();

// Search Arrival-Departure Flights Onclick
const searchInput = (e) => {
  e.preventDefault();

  if (!e.target.classList.contains('active__input')) {
    document.querySelector('.departure').classList.toggle('active');
    document.querySelector('.arrival').classList.toggle('active');
    arrivalButton.classList.toggle('active__input');
    departureButton.classList.toggle('active__input');
  } else {
    return;
  }
};

arrivalButton.addEventListener('click', searchInput);

departureButton.addEventListener('click', searchInput);

//////////////////////////////////////////////////////////
// Reveal sections
const allSections = document.querySelectorAll('.reveal--onscroll');

const revealSection = (entries, observer) => {
  // console.log(entries)
  // console.log(observer)
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('reveal--hidden');

  observer.unobserve(entry.target);
};

const Observer = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.1,
});

allSections.forEach((e) => {
  Observer.observe(e);

  e.classList.add('reveal--hidden');
});

//////////////////////////////////////////////////////////
// Create cards from data.js section5
const createCards = (e) => {
  const cards = document.querySelector('.news-cards');

  items.forEach((e) => {
    const div = document.createElement('div');
    div.classList.add('news-card');
    div.innerHTML = `<img src="${e.img}" alt="${e.alt}">
        <a href="${e.link}" class="text">
            <p>${e.description}</p>
            <p class='read-more'>Read More</p>
        </a>`;
    cards.appendChild(div);
  });
};

createCards()

//Section5 slider
const slider2 = () => {
  const productContainers = [...document.querySelectorAll('.news-cards')],
    nextBtn = [...document.querySelectorAll('#section5 .next-btn')],
    prevBtn = [...document.querySelectorAll('#section5 .prev-btn')];

  productContainers.forEach((item, i) => {
    let containerWidth = item.getBoundingClientRect().width;

    prevBtn[i].addEventListener('click', () => {
      item.scrollLeft -= containerWidth;
    })

    nextBtn[i].addEventListener('click', () => {
      item.scrollLeft += containerWidth;
    })

    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') item.scrollLeft -= containerWidth;
      if (e.key === 'ArrowRight') item.scrollLeft += containerWidth;
    });
  })
}
slider2()
addEventListener('resize', slider2);

//////////////////////////////////////////////////////////
// Show BackToTop button onScroll
window.onscroll = () => {
  document.body.scrollTop >= 500 || document.documentElement.scrollTop >= 500
    ? btnBackToTop.classList.add('active--button')
    : btnBackToTop.classList.remove('active--button');
};

// Scroll smooth BackToTop button
btnBackToTop.addEventListener('click', (e) => {
  e.preventDefault();

  document.querySelector('#backtotop').scrollIntoView({ behavior: 'smooth' });
});

//////////////////////////////////////////////////////////
// Livechat
const livechat = () => {
  const livechatIcon = document.querySelector('.livechat-icon'),
    livechatMessage = document.querySelector('.livechat-textcontent'),
    livechatMessageContent = document.querySelector('.livechat-content'),
    livechatNoMessage = document.querySelector('.no-message'),
    livechatForm = document.querySelector('.livechat-footer form'),
    inputValue = document.querySelector('.livechat-footer input');

  let saveMessages = JSON.parse(localStorage.getItem('messages')) || [];

  livechatIcon.addEventListener('click', () => {
    livechatMessage.classList.toggle('show-chat');
    livechatIcon.classList.toggle('livechat-active');
  });

  document.addEventListener('click', (e) => {
    if (e.target.closest('.livechat')) return;
    livechatMessage.classList.remove('show-chat');
    livechatIcon.classList.remove('livechat-active');
  });

  livechatForm.addEventListener('click', (e) => {
    e.preventDefault();

    inputValue.value <= 0 ? null : writeMessage();
  });

  livechatForm.addEventListener('keyup', (e) => {
    e.preventDefault();

    if (e.keyCode === 13) {
      inputValue.value <= 0 ? null : writeMessage();
    }
    if (e.keyCode === 27) {
      livechatMessage.classList.remove('show-chat');
      livechatIcon.classList.remove('livechat-active');
    }
  });

  const date = (date) => {
    const calcDaysPassed = (date1, date2) =>
      Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

    const daysPassed = calcDaysPassed(new Date(), date);
    console.log(daysPassed);
    let fixHours = `${date.getHours()}`.padStart(2, 0);
    let fixMinutes =
      date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    let amPM = date.getHours() < 12 ? 'AM' : 'PM';

    if (daysPassed === 0) return `${fixHours}:${fixMinutes} ${amPM}`
    if (daysPassed === 1) return 'Yesterday'
    if (daysPassed <= 7) return `${daysPassed} days ago`
  }

  const writeMessage = () => {
    const datee = new Date();
    const showDate = date(datee)

    let message = `
		<div class="livechat-message-sent">
			<span class="livechat-message">
				${inputValue.value.trim()}
			</span>
			<span class="livechat-message-time">${showDate}</span>
		</div>
	`;

    livechatMessageContent.insertAdjacentHTML('beforeend', message);
    livechatMessageContent.scrollTo(0, livechatMessageContent.scrollHeight);
    livechatNoMessage.style.display = 'none';
    livechatMessageContent.style.alignItems = 'center';

    // cart.push(inputValue.value);
    saveMessages = [...saveMessages, { text: inputValue.value, date: datee },];
    messagesToStorage();

    inputValue.value = '';
  }

  const savedMessages = () => {
    if (saveMessages.length > 0) livechatNoMessage.style.display = 'none';

    saveMessages.forEach((e, i) => {
      const datee = new Date(e.date);
      const showDate = date(datee)

      const div = document.createElement('div');
      div.classList.add('livechat-message-sent');
      div.innerHTML = `
			<span class="livechat-message">
				${e.text}
			</span>
			<span class="livechat-message-time">${showDate}</span>
	`;
      livechatMessageContent.appendChild(div);
    });
    livechatMessageContent.scrollTo(0, livechatMessageContent.scrollHeight);
  };
  savedMessages();

  function messagesToStorage() {
    localStorage.setItem('messages', JSON.stringify(saveMessages));
  }
}
livechat()

////////////////////////////////////////////////////////////
const cookie = () => {
  const cookieContainer = document.querySelector(".cookie-container"),
    cookieButton = document.querySelector(".cookie-btn");

  cookieButton.addEventListener("click", () => {
    document.cookie = 'Cookie; max-age=' + 60 + 60 + 24 * 30;
    if (document.cookie) {
      cookieContainer.classList.remove('active')
    } else {
      cookieContainer.classList.add('active')
    }
  });

  setTimeout(() => {
    if (!document.cookie) {
      cookieContainer.classList.add("active");
    }
  }, 2000);
}
cookie()


