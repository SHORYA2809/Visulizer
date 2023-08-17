var n=15;
var sortingprogress=false;

var  clear=[];  // bubble insertion selection merge
myRange.addEventListener('input', () => {

     n = document.getElementById("myRange").value;
    generateNewBars(); 
});

let array=new Array(n);
generateRandom(90,400);
createRandomBar();


function generateRandom(min, max) {
 
    for (let i = 0; i < n; i++) {
        array[i] = Math.floor(Math.random() * (max - min + 1)) + min; // Include both min and max values
    }
}

function clearContainer() {
    let container = document.getElementById("container");
    container.innerHTML = ''; // Clear the container
}

function clearTimeoutfunc(){
    for(let i =0;i<clear.length;i++) clearTimeout(clear[i]);
}

function generateNewBars()
{
    sortingprogress=false;
    clearTimeoutfunc();
    generateRandom(90,400);
    createRandomBar();
}

// during the rendering of the page 
function createRandomBar(){
    clearContainer();
    let classeslist = document.getElementsByClassName("b");
  
    for(let i=0;i<n;i++){
    let container = document.getElementById("container");
    let new_element = document.createElement('bar');
    new_element.classList.add("b");
    new_element.innerHTML=array[i];
    new_element.style.height=array[i]+"px";
    new_element.style.backgroundColor="blanchedalmond"; 
    container.appendChild(new_element);     
    }
}

function stopSorting() {
    sortingPaused = true; 
    for (let i = 0; i < clear.length; i++) {
        clearTimeout(clear[i]);
    }
    clear = [];
    // Reset any sorting flags
    sortingprogress = false;
}


//calling the swap function

let classeslist = document.getElementsByClassName("b");

 function swapping(i,j)
{
    //highlight i ans j
    clear[0]=setTimeout(function () {
        
       clear[1]= setTimeout(function () {
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;

            setTimeout(function () {
                classeslist[i].style.height = array[i] + "px";
                classeslist[j].style.height = array[j] + "px";
    
                ibar = classeslist[i].innerHTML = array[i];
                jbar = classeslist[j].innerHTML = array[j];
            }, 10/n); // Adjust the delay (in milliseconds) for final state after swapping
        }, 10/n); // Adjust the delay (in milliseconds) before swapping
    }, 10/n); // Adjust the delay (in milliseconds) before highlighting bars

}

//bubble sort

async function bubbleSort() {
    
    if(sortingprogress) return ;
    sortingprogress = true;

    // for(let i =0;i<clear.length;i++) clearTimeout(clear[i]);
    for(classl of classeslist) {classl.style.backgroundColor="blanchedalmond"; 
    classl.style.boxShadow = "0 0 0 black";                                
    }
    for (let i = 0; i < n; i++) {
    
        for (let j = 0; j < n-i; j++) {
            await new Promise(resolve => {
                clear[2]=setTimeout(function () {
                    if (array[j] > array[j + 1]) {
                        swapping(j, j + 1);
                    }
                    resolve();
                }, ((i+j)*80)/n); // Adjusting the delay (in milliseconds) for the animation speed
            });
           
            clear[3]=setTimeout(() => {
                document.getElementsByClassName('b')[n - i - 1].style.backgroundColor = "cyan";
                document.getElementsByClassName('b')[n - i - 1].style.boxShadow = "0 0 25px orange";
    
            }, (n - 1) * 40);
           
        
        }}
sortingprogress=false;
       
}



//selection sort

async function SelectionSort() {
    
    if(sortingprogress) return ;
    sortingprogress = true;

    // for(let i =0;i<clear.length;i++) clearTimeout(clear[i]);
    for(classl of classeslist) {classl.style.backgroundColor="blanchedalmond"; 
    classl.style.boxShadow = "0 0 0 black";                                
}

     for(let i =0;i<n;i++)
     {
        let max=i;
        for(let j=i+1;j<n;j++)
        {
             if(array[j]>array[max]) max=j;
        }
         await swapping(i, max);
        // Delay to observe each step
        await new Promise(resolve =>
             clear[4]= setTimeout(resolve,100)); // Adjust the delay (in milliseconds) as needed 
        const sortedElement = document.getElementsByClassName('b')[i];
        sortedElement.style.backgroundColor = "cyan";
        sortedElement.style.boxShadow = "0 0 25px orange";
    }
    sortingprogress=false;
}

async function InsertionSort() {

    if (sortingprogress) return;
    sortingprogress = true;

    for(classl of classeslist) {classl.style.backgroundColor="blanchedalmond"; 
    classl.style.boxShadow = "0 0 0 black";                                
}
    let delay = 30;
    let bars = document.getElementsByClassName('b');
    
    for (let i = 1; i < array.length; i++) {
        let val = array[i];
        let j = i - 1;

        await new Promise(resolve => {
            clear[5] = setTimeout(resolve, i * delay);
        });

        bars[i - 1].style.backgroundColor = "cyan"; // Set ith bar to red

        await new Promise(resolve => {
            clear[6] = setTimeout(resolve, (i - j) * delay);
        });

        while (j >= 0 && array[j] > val) {
            array[j + 1] = array[j];
            bars[j + 1].style.height = array[j] + "px";
            bars[j + 1].innerHTML = array[j];
            j--;

            await new Promise(resolve => {
                clear[6] = setTimeout(resolve, delay);
            });
        }

        array[j + 1] = val;
        bars[j + 1].style.height = val + "px";
        bars[j + 1].innerHTML = val;

        bars[i].style.backgroundColor = "cyan";
        bars[i].style.boxShadow = "0 0 25px orange";
    
        await new Promise(resolve => {
            clear[7] = setTimeout(resolve, (i+j) * delay);
        });
    }

    bars[array.length - 1].style.backgroundColor = "cyan"; // Set last bar to red
    bars[array.length-1].style.boxShadow = "0 0 25px orange";
    
    sortingprogress = false;
}

function MergeSort() {
    if (sortingprogress) return;
    sortingprogress = true;

    for(classl of classeslist) {classl.style.backgroundColor="blanchedalmond"; 
    classl.style.boxShadow = "0 0 0 black";                                
}
    mergeSorting(0, array.length - 1).then(() => {
        sortingprogress = false;
    }).then(()=>{
          for(let classl of classeslist){ classl.style.backgroundColor="cyan";
          classl.style.boxShadow = "0 0 25px orange";
        }
        })
    };



async function mergeSorting(start, end) {
      
    if (!sortingprogress || start >= end) return;
        if (start > end) {
            return;
        }

        let mid = Math.floor((start + end) / 2);
        await mergeSorting(start, mid);
        await mergeSorting(mid + 1, end);

        merge(start, mid, mid + 1, end);
     
        // Delay before resolving the promise
            updateVisualization();
        await new Promise(resolve => clear[8]=setTimeout(resolve, 300)); // Adjust the delay as needed
}

    function merge( fs, fe,  ss,  se )
    {
        let ll=[];
        let i=fs,j=ss;
        while(i<=fe && j<=se)
        {
            if(array[i]<array[j]) ll.push(array[i++]);
            else 
             ll.push(array[j++]);
        }
        while(i<=fe) ll.push(array[i++]);
        while(j<=se) ll.push(array[j++]);
        
        let idx=0;
        for(let k =fs;k<=se;k++)
        {
            array[k]=ll[idx++];
            classeslist[k].style.height=array[k]+"px";
            classeslist[k].innerHTML=array[k];
        }
    }

function updateVisualization() {
    const arrayContainer = document.getElementById("container");
    arrayContainer.innerHTML = "";

    for (let i = 0; i < array.length; i++) {
        
        let container = document.getElementById("container");
        let new_element = document.createElement('bar');
        new_element.classList.add("b");
        new_element.innerHTML=array[i];
        new_element.style.height=array[i]+"px";
        new_element.style.backgroundColor="blanchedalmond"; 
        container.appendChild(new_element);     
        
    }
}
        

