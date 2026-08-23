let input=document.getElementById('champ');
let val;
let content=document.getElementById('content');
let choix=document.getElementById('choix');
choix.style.display='none'
let currentNotdone;
function takeval(){
   if(input.value===""){
    alert('Veuillez entrer une tâche!!!');
   }
   else{
    choix.style.display="flex";
  
    val=input.value;
    input.value="";
    let tache=document.createElement('div');
    tache.classList.add('tache');
    let not_done=document.createElement('i');
    not_done.classList.add('fa-regular','fa-circle','not_done');
    currentNotdone=not_done;
    not_done.addEventListener('click', function(){
        if(this.classList.contains('not_done')){
            if(choix.style.display==='none'){
                this.classList.replace('fa-circle','fa-circle-check');
                this.classList.replace('not_done','done');
                this.parentElement.querySelector('span').style.opacity=0.5;
                this.parentElement.querySelector('span').style.textDecoration='line-through';
            }
        }
        else{
            this.classList.replace('fa-circle-check','fa-circle');
            this.classList.replace('done','not_done');
            this.parentElement.querySelector('span').style.opacity=1;
            this.parentElement.querySelector('span').style.textDecoration='none';      
        }
        sauvegarde();
    })
    
    let supp=document.createElement('i');
    supp.classList.add('fa-solid', 'fa-trash','supp');
    supp.addEventListener('click', function(){
        if(choix.style.display==='none'){
        this.parentElement.remove();
        sauvegarde();
        }
    })
    let span=document.createElement('span');
    span.textContent=val;
    tache.append(not_done,supp,span);
    content.append(tache);
    sauvegarde();
 }
}
input.addEventListener('blur',takeval);
input.addEventListener('keydown', (e) => {
    if(e.key==='Enter'){
        input.blur();
    }
});
         let radios=document.querySelectorAll('input[name="importance"]');
    radios.forEach(radio => {
        radio.addEventListener('change', function(){
           setTimeout(function(){
            choix.style.display="none";
              radios.forEach(r => {r.checked=false});
           },200);
             if(currentNotdone){
                 currentNotdone.classList.remove('pas_important','moyen','urgent');
                 currentNotdone.classList.add(this.value);
            }
          sauvegarde();
        });
    });
    let tasks;
    let etat_tasks;
    let toutes=document.getElementById('toutes');
    let en_cours=document.getElementById('en_cours');
    let terminé=document.getElementById('terminé');
    let filter_pas_important=document.getElementById('filter_pas_important');
    let filter_moyen=document.getElementById('filter_moyen');
    let filter_urgent=document.getElementById('filter_urgent');
    toutes.addEventListener('click',function(){
        tasks=document.querySelectorAll('.tache');
        tasks.forEach(task => {
            task.style.display='inline-block';
        })
    });
    en_cours.addEventListener('click',function(){
        tasks=document.querySelectorAll('.tache');
         tasks.forEach(task => {
            if(task.firstChild.classList.contains('not_done')){
                task.style.display='inline-block';
            }
            else{
                task.style.display='none'
            }
        });
    });
    terminé.addEventListener('click', function(){
         tasks=document.querySelectorAll('.tache');
         tasks.forEach(task => {
            if(task.firstChild.classList.contains('done')){
                task.style.display='inline-block';
            }
            else{
                task.style.display='none'
            }
         });
    });
    filter_pas_important.addEventListener('click', function(){
        tasks=document.querySelectorAll('.tache');
        tasks.forEach(task => {
            if(task.firstChild.classList.contains('pas_important')){
                task.style.display='inline-block';
            }
            else{
                task.style.display='none'
            }
        });
    });
       filter_moyen.addEventListener('click', function(){
        tasks=document.querySelectorAll('.tache');
        tasks.forEach(task => {
            if(task.firstChild.classList.contains('moyen')){
                task.style.display='inline-block';
            }
            else{
                task.style.display='none'
            }
        });
    });
       filter_urgent.addEventListener('click', function(){
        tasks=document.querySelectorAll('.tache');
        tasks.forEach(task => {
            if(task.firstChild.classList.contains('urgent')){
                task.style.display='inline-block';
            }
            else{
                task.style.display='none'
            }
        });
    });
    function sauvegarde(){
       let taches=[];
        document.querySelectorAll('.tache').forEach(tache =>{
            let icone=tache.querySelector('i.not_done,i.done');
            let text=tache.querySelector('span').textContent;
            let niv_importance=icone.classList.contains('pas_important')? 'pas_important' : icone.classList.contains('moyen')? 'moyen' : 'urgent';
            taches.push({
                texte: text,
                fait: icone.classList.contains('done'),
                importance: niv_importance
            });
        });
        localStorage.setItem('taches',JSON.stringify(taches));
    }
    function chargerTache(){
        let taches=JSON.parse(localStorage.getItem('taches')) || [];
        taches.forEach(tache => {
            let task=document.createElement('div');
            task.classList.add('tache');
            let icone=document.createElement('i');
            if(tache.fait){
                icone.classList.add('fa-regular','fa-circle-check', 'done');
            }
            else{
                 icone.classList.add('fa-regular','fa-circle', 'not_done');
            }
            icone.addEventListener('click', function(){
            if(this.classList.contains('not_done')){
                if(choix.style.display==='none'){
                    this.classList.replace('fa-circle','fa-circle-check');
                    this.classList.replace('not_done','done');
                    this.parentElement.querySelector('span').style.opacity=0.5;
                    this.parentElement.querySelector('span').style.textDecoration='line-through';
                    sauvegarde();
                }
            }
        else{
             this.classList.replace('fa-circle-check','fa-circle');
             this.classList.replace('done','not_done');
             this.parentElement.querySelector('span').style.opacity=1;
             this.parentElement.querySelector('span').style.textDecoration='none';
             sauvegarde();
        }
    })
            let span=document.createElement('span');
            span.textContent=tache.texte;
            
            if(tache.importance==='pas_important'){
                icone.classList.add('pas_important');
            }
            else if(tache.importance==='moyen'){
                icone.classList.add('moyen');
            }
            else{
                icone.classList.add('urgent');
            }
             if(tache.fait){
                span.style.opacity = 0.5;
                span.style.textDecoration = 'line-through';
            }
            let supp=document.createElement('i');
            supp.classList.add('fa-solid','fa-trash','supp');
             supp.addEventListener('click', function(){
                if(choix.style.display==='none'){
                this.parentElement.remove();
                sauvegarde();
                }
            })
            task.append(icone,supp,span);
            content.append(task);
        })
    }
    chargerTache();
    