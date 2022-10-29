import React, { useEffect,useState } from 'react';
import './Info.css';

function Info() {

    return(
        <div className = "col-sm-6 offset-sm-3">
            <div class="about-section">
                <h1>Інформація про наш сайт</h1>
                <p>Цей сайт створений для забезпечення захисту країни</p>
                <p>Основня його мата: надання важливої інформації про розташування ворожої техніки та ворога самого</p>
                <p>На ньому ви знайдете пости, котрі створюють звичайні люді</p>
                <p>В постах може бути будь яка інормація, пам'ятайте, що її достоверність не може буде досконалою на 100%</p>
                <p>Корисні посилання: </p>
                <ul class = "infUl">
                    <li class = "infLi"><a href = "https://github.com/studentprogrammer17">github</a></li>
                    <li class = "infLi"><a href = "https://alerts.in.ua">Мапа тривог</a></li>
                    <li class = "infLi"><a href = "https://deepstatemap.live/">Мапа війни</a></li>
                </ul>
                </div>

                <h2 style={{textAlign:"center"}}>Творець сайту</h2>
                <div style = {{marginLeft: "150px"}} class="card">
                <img src={require("../../uploads/adminLOL.jpg")} alt="aDMIN" style={{width:"50%"}}/>
                <div class="container">
                    <h2>Дмитро Дубінін</h2>
                    <p class="title">CEO & Founder</p>
                    <p></p>
                    <p><a href="mailto:dimadubinin@gmail.com">dimadubinin@gmail.com</a></p>
                    <p><button class="button">Contact</button></p>
                </div>
            </div>
        </div>
    )
}

export default Info;