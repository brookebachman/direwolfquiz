// function wait(label) {
// 	return new Promise((resolve) => {
// 		setTimeout(resolve(label), 1000);
// 	});
// }
// async function test() {
// 	const list = [wait('First'), wait('Second')];
// 	console.log('Started function');
// 	list.forEach(async function (x) {
// 		console.log('Started 1');
// 		console.log(await x);
// 		console.log('Finished');
// 	});
// 	console.log('Finished function');
// }

// test();

function wait(label) {
	return new Promise((resolve) => {
		setTimeout(resolve(label), 1000);
	});
}
async function test() {
	const list = [wait('First'), wait('Second')];
	console.log('Started function');
    await awaitEach(list)
}
	

async function awaitEach(list){
  return new Promise(async (resolve) => {
  for (let i =0; i < list.length; i++){
    console.log('Started');
	console.log(await list[i]);
	console.log('Finished');
   
  }
  console.log('Finished function');

  })
}
  
test();

// Started function
// Started
// First
// Finished
// Started
// Second
// Finished
// Finished Function