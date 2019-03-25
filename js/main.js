// scroll
$(window).scroll(function() {
            var scroll = $(window).scrollTop();
            if (scroll > 0) {
                $("header").addClass('scrolled');
            } else {
                $("header").removeClass('scrolled');
            }
        });
   
// responcive  
        $(document).ready(function() {
            $('.menu-toggle').click(function() {
                $('nav').toggleClass('active')
            })
        });
 

   

        
      // vertical slider    
    jQuery('#thumbnail li').click(function ()
    {
        jQuery(this).addClass('active').siblings().removeClass('active');
        var slide = jQuery('#slide2 li'),
            slideTop = 0,
            slideBlock = jQuery('#slide2 ul'),
            thum = jQuery('#thumbnail .thumbnail-list li'),
            thumTop = jQuery('#thumbnail .thumbnail-list  .active').position().top - jQuery('#thumbnail .thumbnail-list').position().top + 'px';

        for (var i = 0; i < thum.length; i++)
        {
            if (jQuery(thum[i]).hasClass('active'))
            {
                jQuery(jQuery(slide)[i]).addClass('active').siblings().removeClass('active');
            }
        }

        for (var i = 0; i < slide.length; i++)
        {
            jQuery(jQuery('#slide2 li .blur-img')[i]).attr('style', jQuery(jQuery('#slide2 li .img')[i]).attr('style'));
            if (jQuery(jQuery(slide)[i]).hasClass('active'))
            {
                slideTop += -(550 * i);
                jQuery(slideBlock).css('transform', 'translateY(' + slideTop + 'px)');
            }
        }

        jQuery('#thumbnail .marker').css('top', (thumTop));
    });
    jQuery(jQuery('#thumbnail li')[0]).trigger('click');
        
// paralax
        $(document).ready(function(){
            $(window).scroll(function(){
                $('.paral lax').css("opacity", 1 -
                    $(window).scrollTop()/600)
            })
        })
    //countdown
        var countDownDate = new Date("Dec 31, 2019 00:00:00").getTime();
        var countDownfunctions = setInterval(function(){
            var now = new Date().getTime();
            var distance = countDownDate - now;
            
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            document.getElementById("countdown1").innerHTML = days + "d " + hours + "h " + minutes +"m " + seconds + "s ";
            
            if(distance < 0) {
                clearInterval(countDownfunctions);
                document.getElementById("countdown1").innerHTML = "EXPIRED";
            }
            },1000);
// lokacija se menja u odnosu na događaj (po difoltu je value:wrong -)
var s2 = document.getElementById('location');
s2.innerHTML = "<option value='wrong'>—</option>";

function locationOpt() {
    var s1 = document.getElementById('event');
    var locationOptions = [];
    s2.innerHTML = "";
    if (s1.value == "Muzej") {
        locationOptions = ["wrong|—", "galerija|Galerija", "hall|Hall", "krov|Krov"];
    } else if (s1.value == "Bioskop") {
        locationOptions = ["wrong|—", "hollywood|Hollywood", "matrix|Matrix", "futurama|Futurama"];
    } else if (s1.value == "Pozoriste") {
        locationOptions = ["wrong|—", "Madlenijanum|Madlenijanum", "mala_sala|Mala Sala", "atrium|Atrium"];
    } else {
        locationOptions = ["wrong|—"];
    }
    for (var option in locationOptions) {
        var par = locationOptions[option].split("|");
        var novaOpcija = document.createElement('option');
        novaOpcija.value = par[0];
        novaOpcija.innerHTML = par[1];
        s2.options.add(novaOpcija);
    }
}
// upload slike i ispis naziva fajla u label-u
var fileInput = document.getElementById("customFile");
var fileLabel = document.getElementById('fileLabel');

fileInput.addEventListener('change', function () {
    if (fileInput) {
        fileLabel.innerHTML = "Izabrali ste - " + fileInput.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];

    } else {
        fileLabel.innerHTML = 'Slika nije izabrana';
    }
});

/////////// Validacija

var error = '';
var brojac = 0;
function validateForm() {
    var isDescriptionOk = validateDescription();
    var isTimeOk = validateTime();
    var isDateOk = validateDate();
    var isLocationOk = validateLocation();
    var isEventOk = validateEvent();
    var isNameEventOk = validateNameEvent();
    var isFileOk = validateFile();


    if (isDescriptionOk && isTimeOk && isDateOk && isLocationOk && isEventOk && isNameEventOk && isFileOk) {
        getForm();
        brojac++;
    } else {
        alert(error);
    }
}
// globalna funcija za ubacivanje u local storage
function setElementToLocalStorage(element, value) {
    localStorage.setItem(element, JSON.stringify(value));
}
// get element and set it to local storage if passes validation


function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        console.log(reader);

        reader.onload = function (e) {
            $('#image-preview').attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
        // document.getElementById("image-preview").style.display = "none";
    }
}
function validateFile() {
    var file = document.getElementById('customFile').value;
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if (file) {
        if (allowedExtensions.exec(file)) {
            readURL(customFile);
            setElementToLocalStorage('File', "Izabrana slika");
// ne stavljam sliku u storage samo potvrdu da je izabrana
// samo simuliramo kao da je stavljamo a u stvari se ona učita iz reader-a odmah a menjam display block i none
            return true;
        } else {
            error = 'Slika mora biti .jpeg, .jpg, .png ili .gif!';
            return false;
        }
    } else {
        error = 'Izaberite sliku!';
        return false;
    }
}


function validateNameEvent() {
    var nameEvent = document.getElementById('nameevent').value;

    if (nameEvent) {
        setElementToLocalStorage('NameEvent', nameEvent);
        return true;
    } else {
        error = 'Unesite naziv događaja!';
        return false;
    }
}

function validateEvent() {
    var event = document.getElementById('event').value;

    if (event != "wrong") {
        setElementToLocalStorage('Event', event);
        return true;
    } else {
        error = 'Izaberite događaj!';
        return false;
    }
}

function validateLocation() {
    var location = document.getElementById('location').value;

    if (location != "wrong") {
        setElementToLocalStorage('Location', location);
        return true;
    } else {
        error = 'Izaberite lokaciju!';
        return false;
    }
}


function validateDate() {
    var date = document.getElementById('date').value;

    if (date) {
        setElementToLocalStorage('Date', date);
        return true;
    } else {
        error = 'Unesite datum!';
        return false;
    }
}

function validateTime() {
    var time = document.getElementById('time').value;

    if (time) {
        setElementToLocalStorage('Time', time);
        return true;
    } else {
        error = 'Unesite vreme!';
        return false;
    }
}

function validateDescription() {
    var description = document.getElementById('description').value;

    if (description) {
        setElementToLocalStorage('Description', description);
        return true;
    } else {
        error = 'Unesite informacije o dogadjaju!';
        return false;
    }
}

// globalna funckija za vracanje iz local storage 
function getElementFromLocaleStorage(element) {
    return localStorage.getItem(element);
}

function getForm() {
    addItems();
}

function getItems(){
    var obj = {};
    obj.time = JSON.parse(getElementFromLocaleStorage("Time"));
    obj.description = JSON.parse(getElementFromLocaleStorage("Description")
    );
    obj.date = JSON.parse(getElementFromLocaleStorage("Date"));
    obj.location = JSON.parse(getElementFromLocaleStorage("Location"));
    obj.event = JSON.parse(getElementFromLocaleStorage("Event"));
    obj.nameEvent = JSON.parse(getElementFromLocaleStorage("NameEvent"));
    obj.file = JSON.parse(getElementFromLocaleStorage("File"));
    return obj
}

function addItems(){
    var element = getItems();
    var item = `    <div id="ispis_id">
                    <div id="ispisi${brojac}">
                    <h3 id="h3Dog">${element.nameEvent}</h3>
                    <div class="image-container">
                        <p id="new-file"></p>
                        <img src="" id="image-preview" />
                    </div>
                    <p id="new-event">Dogadjaj: ${element.event}</p>
                    <p id="new-location">Lokacija: ${element.location}</p>
                    <p id="new-date">Datum: ${element.date}</p>
                    <p id="new-time">Pocetak: ${element.time}</p>
                    <p id="new-description">Opis: ${element.description}</p>
                </div>
            </div>`;
    var drzac = document.getElementById("formular");
    drzac.innerHTML += item;
}

