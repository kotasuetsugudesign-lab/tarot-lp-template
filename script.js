// =========================================
// DOM読み込み後
// =========================================
document.addEventListener("DOMContentLoaded", () => {


// =========================================
// ハンバーガーメニュー
// =========================================
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");

if (hamburger && nav) {

hamburger.addEventListener("click", () => {
hamburger.classList.toggle("active");
nav.classList.toggle("active");

/* スクロール停止 */
document.body.classList.toggle("nav-open");
});

}


// =========================================
// ナビリンククリックで閉じる
// =========================================
const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {
link.addEventListener("click", () => {
if (hamburger) hamburger.classList.remove("active");
if (nav) nav.classList.remove("active");
document.body.classList.remove("nav-open");
});
});


// =========================================
// 外クリックで閉じる
// =========================================
document.addEventListener("click", (e) => {

if (!nav || !hamburger) return;

if (
nav.classList.contains("active") &&
!nav.contains(e.target) &&
!hamburger.contains(e.target)
) {
nav.classList.remove("active");
hamburger.classList.remove("active");
document.body.classList.remove("nav-open");
}

});


// =========================================
// ESCキーで閉じる
// =========================================
document.addEventListener("keydown", (e) => {

if (e.key === "Escape") {
if (!nav || !hamburger) return;

nav.classList.remove("active");
hamburger.classList.remove("active");
document.body.classList.remove("nav-open");
}

});


// =========================================
// FAQ アコーディオン
// =========================================
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

const question = item.querySelector(".faq-q");

if (question) {
question.addEventListener("click", () => {
item.classList.toggle("active");
});
}

});


// =========================================
// ヘッダースクロール演出
// =========================================
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

if (!header) return;

if (window.scrollY > 100) {
header.classList.add("scrolled");
} else {
header.classList.remove("scrolled");
}

}, { passive: true });


// =========================================
// スムーススクロール（精度改善版）
// =========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {

anchor.addEventListener("click", function(e) {

const targetId = this.getAttribute("href");

if (!targetId || targetId === "#") return;

const target = document.querySelector(targetId);
if (!target) return;

e.preventDefault();

const offset = header ? header.offsetHeight : 80;

// ⭐ 修正版（ズレ防止）
const rect = target.getBoundingClientRect();
const position = rect.top + window.scrollY - offset;

window.scrollTo({
top: position,
behavior: "smooth"
});

});

});


// =========================================
// スクロールアニメーション
// =========================================
const targets = document.querySelectorAll(".fade-up");

if (targets.length > 0) {

const observer = new IntersectionObserver((entries) => {

entries.forEach(entry => {

if (entry.isIntersecting) {
entry.target.classList.add("active");
observer.unobserve(entry.target);
}

});

},{
threshold:0.15
});

targets.forEach(target => observer.observe(target));

}


// =========================================
// ⭐ タロット体験（最終版）
// =========================================
const tarotCards = document.querySelectorAll(".tarot-card");
const tarotResult = document.querySelector(".tarot-result");
const tarotText = document.querySelector(".tarot-result-text");

if (tarotCards.length > 0 && tarotResult && tarotText) {

tarotCards.forEach(card => {

card.addEventListener("click", () => {

const result = card.dataset.result;

// テキスト更新
tarotText.textContent = result;

// 表示（クラス管理）
tarotResult.style.display = "block";

// スクロール
tarotResult.scrollIntoView({
behavior: "smooth",
block: "center"
});

// active制御（1枚だけ）
tarotCards.forEach(c => c.classList.remove("active"));
card.classList.add("active");

});

});

}

});