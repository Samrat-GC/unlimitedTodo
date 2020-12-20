const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');
var arrayItem = [];


function filterItem(searchValue){
    Array.from(list.children)
        .filter(todo => !todo.textContent.toLowerCase().includes(searchValue))
        .forEach(todo => todo.classList.add('not-this'));

    Array.from(list.children)
        .filter(todo => todo.textContent.toLowerCase().includes(searchValue))
        .forEach(todo => todo.classList.remove('not-this'));
}



const generateTemplateFromStorage = () => {       
		 arrayItem = JSON.parse(localStorage.getItem('OneInAMillionArr'));

		 arrayItem.forEach(item => {
			const html =  `
			<li class="list-group-item d-flex justify-content-between align-items-center" id="${item.key}">
					<span>${item.value}</span>
					<i class="fas fa-trash delete fa-2x"></i>
			</li>
	`;

			list.innerHTML += html;
		 })
};

const generateTemplate = item => {                                                
     const html =  `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${item}</span>
            <i class="fas fa-trash delete fa-2x"></i>
        </li>
    `

    list.innerHTML += html;

    addForm.add.value = null;
};

const pushToStorage = item => {
	arrayItem.push(
		{
			'key': Date.now(),
			'value': item,
});
	localStorage.setItem('OneInAMillionArr', JSON.stringify(arrayItem));
}

if(localStorage.OneInAMillionArr){
	Array.from(list.children)
	.forEach(item => item.remove());

	generateTemplateFromStorage();

}else{
	localStorage.OneInAMillionArr = '';
};


addForm.addEventListener('submit', e => {
    e.preventDefault();
    const todo = addForm.add.value.trim();
    if(todo){
				generateTemplate(todo);
				pushToStorage(todo);
    }

    
});

// delete todos

list.addEventListener('click', e => {
    console.log(e);
    if(e.target.classList.contains('delete')){
 
				// console.log(e.target.parentElement);
				let id = e.target.parentElement.id;
				
				e.target.parentElement.remove();

				arrayItem.some((item,index,arr) => {
					if(item.key == id){
						arr.splice(index, 1);
						return true;
					}
				});

				localStorage.setItem('OneInAMillionArr', JSON.stringify(arrayItem));


    }
});

// live feedback

search.addEventListener('keyup', () => {
    const searchValue = search.value.trim().toLowerCase();
    
    filterItem(searchValue);



});

// if(localStorage){
//     generateTemplate(localStorage.getItem('oi'))
// }


// arrayItem.forEach((item,index,arr)=>{
// 	console.log(item, index, arr);
// })