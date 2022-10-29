import React, { useEffect,useState } from 'react';
import './Footer.css';

function Footer() {

    return(
        <footer>
        <div class="footer">
        <div class="container">
            <div class="row">
                <div class="foot-col">
                    <h3>Завантажити нашу програму</h3>
                    <p>Завантажити на Android або IOS</p>
                    <div class="down-logo">
                        <img src={require("../../uploads/footer/app-store.png")} alt="ios"/>
                        <img src={require("../../uploads/footer/play-store.png")} alt="android"/>
                    </div>
                </div>
                <div class="foot-col-2">
                    <img src={require("../../uploads/footer/UAflag.png")} alt="ua"/>
                    <p>Мета нашого сайту – знищити ворога</p>
                </div>
                <div class="foot-col-3">
                    <h3>Корисні посилання</h3>
                    <ul>
                        <li><a href = "/info">FAQ</a></li>
                        <li><a href = "https://alerts.in.ua/">Мапа тривог</a></li>
                        <li>Політика конфідейційності</li>
                    </ul>
                </div>
                <div class="foot-col-4">
                    <h3>Слідкуй за нами</h3>
                    <ul>
                        <li>Telegram</li>
                        <li>Instagram</li>
                        <li>Youtube</li>
                        <li>Twitter</li>
                    </ul>
                </div>
            </div>
            <hr/>
            <p class = "copyright">Copyright 2022 - деВорог?</p>
        </div>
        </div>
        </footer>
    )
}

export default Footer;

