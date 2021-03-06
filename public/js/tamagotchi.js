let petId = localStorage.getItem('petId')
let sleeping

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function sound_button(){
    let sound = document.getElementById("sound_button")
    sound.play()
}
// TODO update values on screen
// TODO save pet id
async function update() {
    let res = await axios.get('api/pet/' + petId)
    data = res.data
    console.log(data)
    $('#health').val(data.health)
    $('#happy').val(data.happy)
    $('#hunger').val(data.hunger)
    $('#energy').val(data.tiredness)
    $('#higiene').val(data.higiene)
    if(data.sleeping == 'true'){
        $('#sleeping').show()
        sleeping = true
    } else {
        $('#sleeping').hide()
        sleeping = false
    }
    document.getElementById("name").innerHTML = data.name;
    document.getElementById("name1").innerHTML = data.name;
    document.getElementById("state").innerHTML = data.state;
    document.getElementById("weight").innerHTML = data.weight;
    document.getElementById("age").innerHTML = data.age;
    await sleep(10000)
    update()
}

$(document).ready(function () {
    $('#sleeping').hide()
    axios.get('api/pet/' + petId).then(function (res) {
        data = res.data
        $('#health').val(data.health)
        $('#happy').val(data.happy)
        $('#hunger').val(data.hunger)
        $('#energy').val(data.tiredness)
        $('#higiene').val(data.higiene)
        $('#changeName').attr("value", data.name)
        $('#pet').attr("src", "images/" + data.petType + data.stage + ".gif");
        if(data.state == 'dead'){
            $('#pet').addClass('dead');
        }
        $('#info').popover({
            html : true,
            trigger: 'focus',
            title: function () {
                return $("#header-info").html();
            },
            content: function() {
                sound_button()
                return $("#body-info").html();
            }
        });
        $('#game').popover({
            html : true,
            trigger: 'focus',
            title: function () {
                return $("#header-game").html();
            },
            content: function() {
                sound_button()
                return $("#body-game").html();
            }
        });
        
        $('#exampleModal').on('shown.bs.modal', function () {
            sound_button()
            $('#myInput').trigger('focus')
        })

        document.getElementById("name").innerHTML = data.name;
        document.getElementById("name1").innerHTML = data.name;
        document.getElementById("state").innerHTML = data.state;
        document.getElementById("weight").innerHTML = data.weight;
        document.getElementById("age").innerHTML = data.age;

        console.log( $('#pet'))
        update()
    }).catch(function (err) {
        console.log(err)
    })
});

function buyFeed(x){
    let id = x.id;
    let value = Number($("#"+id+"-value").text())
    let price = Number($("#"+id+"-price").text())
    axios.put('api/pay', {
        cash: price
    }).then(function (res) {
        feed(value);
        updateCash();        
    }).catch(function (err) {
        alert("Dinheiro insuficiente!")
        return;
    })
}

function buyMed(x){
    let id = x.id;
    let value = Number($("#"+id+"-value").text())
    let price = Number($("#"+id+"-price").text())
    axios.put('api/pay', {
        cash: price
    }).then(function (res) {
        heal(value);
        updateCash();
    }).catch(function (err) {
        alert("Dinheiro insuficiente!")
        return;
    })
}

function feed(x) {
    sound_button()
    if(isSleeping()){
        return
    }
    axios.put('api/pet/' + petId + '/feed', {
        value: x
    }).then(function (res) {
        data = res.data
        console.log(data)
        $('#hunger').val(data.hunger)
    }).catch(function (err) {
        console.log(err)
    })
}

function clean(x) {
    sound_button()
    if(isSleeping()){
        return
    }
    axios.put('api/pet/' + petId + '/clean', {
        value: x
    }).then(function (res) {
        data = res.data
        console.log(data)
        $('#higiene').val(data.higiene)
    }).catch(function (err) {
        console.log(err)
    })
}

function play(x) {
    sound_button()
    if(isSleeping()){
        return
    }
    axios.put('api/pet/' + petId + '/play', {
        value: x
    }).then(function (res) {
        data = res.data
        console.log(data)
        $('#happy').val(data.happy)
    }).catch(function (err) {
        console.log(err)
    })
}

function heal(x) {
    sound_button()
    if(isSleeping()){
        return
    }
    axios.put('api/pet/' + petId + '/heal', {
        value: x
    }).then(function (res) {
        data = res.data
        console.log(data)
        $('#health').val(data.health)
    }).catch(function (err) {
        console.log(err)
    })
}

function goSleep() {
    sound_button()
    axios.put('api/pet/' + petId + '/sleep').then(function (res) {
        data = res.data
        console.log(data)
        if(data.sleeping == 'true'){
            $('#sleeping').show()
            sleeping = true
        } else {
            $('#sleeping').hide()
            sleeping = false
        }
    }).catch(function (err) {
        console.log(err)
    })
}

async function coin(){
    sound_button()
    if(isSleeping()){
        return
    }
    axios.put('api/pet/' + petId + '/play', {
        value: 20
    }).then(function (res) {
        data = res.data
        console.log(data)
        $('#happy').val(data.happy)
        window.location.href = "/coin";
    }).catch(function (err) {
        console.log(err)
    })
    // console.log('oi')
}

async function jankenpo(){
    sound_button()
    if(isSleeping()){
        return
    }
    axios.put('api/pet/' + petId + '/play', {
        value: 30
    }).then(function (res) {
        data = res.data
        console.log(data)
        $('#happy').val(data.happy)
        window.location.href = "/jakenpo";
    }).catch(function (err) {
        console.log(err)
    })
    // console.log('oi')
}

async function battle(){
    sound_button()
    if(isSleeping()){
        return
    }
    axios.put('api/pet/' + petId + '/play', {
        value: 20
    }).then(function (res) {
        data = res.data
        console.log(data)
        $('#happy').val(data.happy)
        window.location.href = "/battle";
    }).catch(function (err) {
        console.log(err)
    })
    // console.log('oi')
}

function isSleeping(){
    if(sleeping){
        alert('Pokemon está dormindo')
        return true
    }
    return false
}

function changeName(){
    name = $("#changename").val()    
    if (name != '') {
        axios.put('api/pet/' + petId + '/name', {
            name: name
        }).then(function (res) {
            alert("Nome mudado!")
        })
    } else {
        alert("Preencha podos os campos")
        return;
    }
    console.log(name)
    console.log("oi")
}