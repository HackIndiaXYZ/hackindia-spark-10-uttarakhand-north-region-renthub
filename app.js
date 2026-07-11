var dataStored = localStorage.getItem('local_items_list');
var itemArray = [];

if (dataStored) {
    itemArray = JSON.parse(dataStored);
} else {
    itemArray = [
        { title: "Gear Cycle", rate: 120, area: "Hostel 1", photo: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400" },
        { title: "Canon Camera", rate: 450, area: "Sector 4", photo: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400" },
        { title: "Sem 3 Book", rate: 20, area: "Library", photo: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400" }
    ];
}

var containerGrid = document.getElementById('grid-list');
var entryForm = document.getElementById('item-form');
var nameInput = document.getElementById('samaan_naam');
var helperText = document.getElementById('system-tip');
var searchBox = document.getElementById('find-box');

function pickPhoto(inputName) {
    var str = inputName.toLowerCase();
    if (str.indexOf('cycle') !== -1 || str.indexOf('bike') !== -1) {
        return "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400";
    } else if (str.indexOf('camera') !== -1 || str.indexOf('canon') !== -1) {
        return "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400";
    } else if (str.indexOf('book') !== -1) {
        return "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400";
    } else {
        return "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400"; 
    }
}

function updateUI(arrayToDisplay) {
    containerGrid.innerHTML = '';
    var currentList = arrayToDisplay || itemArray;
    
    for (var i = 0; i < currentList.length; i++) {
        var singleItem = currentList[i];
        var divCard = document.createElement('div');
        divCard.className = 'item-card';
        divCard.innerHTML = '<img src="' + singleItem.photo + '">' +
            '<div class="item-data">' +
                '<h4>' + singleItem.title + '</h4>' +
                '<p class="price-tag">₹' + singleItem.rate + '/day</p>' +
                '<p class="place-tag">📍 ' + singleItem.area + '</p>' +
            '</div>';
        containerGrid.appendChild(divCard);
    }
}

searchBox.addEventListener('input', function(e) {
    var text = e.target.value.toLowerCase();
    var filteredList = [];
    
    for (var i = 0; i < itemArray.length; i++) {
        var t = itemArray[i].title.toLowerCase();
        var a = itemArray[i].area.toLowerCase();
        if (t.indexOf(text) !== -1 || a.indexOf(text) !== -1) {
            filteredList.push(itemArray[i]);
        }
    }
    updateUI(filteredList);
});

nameInput.addEventListener('input', function(e) {
    var textVal = e.target.value.toLowerCase();
    if (textVal.indexOf('cycle') !== -1) {
        helperText.innerText = "Normal rate is around ₹100-₹150";
    } else if (textVal.indexOf('camera') !== -1) {
        helperText.innerText = "Normal rate is around ₹400-₹500";
    } else {
        helperText.innerText = "System checking local price...";
    }
});

entryForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    var typedTitle = document.getElementById('samaan_naam').value;
    var priceVal = document.getElementById('kharcha').value;
    var locationVal = document.getElementById('kahan_hai').value;
    
    var currentObject = {
        title: typedTitle,
        rate: priceVal,
        area: locationVal,
        photo: pickPhoto(typedTitle)
    };
    
    itemArray.unshift(currentObject);
    localStorage.setItem('local_items_list', JSON.stringify(itemArray));
    
    updateUI();
    entryForm.reset();
    helperText.innerText = "Item added to active list successfully!";
});

updateUI();
