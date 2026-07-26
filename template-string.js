const fastName = 'Jeyaul'
const lastName ='Hoqeu'

const AboutMe  = `My Name is ${fastName}`;


const mony = `gib me mony ${10 + 20 - 85 + 30 *58 +20 / 2}`;

console.log(AboutMe);
console.log(mony);


function getcarthtml(name , description , price ){
    const cart =`
    <div class="cart">
     <h1> my cart Nmme is ${name}</h1>
     <h2> My cart description is ${description}</h2>
     <p> My cart price is ${10 + 20 - 85 + 30 *58 +20 / 2}</p>


    </div>

    `;

    console.log(cart);
}

getcarthtml('Iphone 14 Pro Max' , 'This is my new phone' , 1200);