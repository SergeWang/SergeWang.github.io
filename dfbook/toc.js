// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="vae.html"><strong aria-hidden="true">1.</strong> VAE</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="vae-building-blocks.html"><strong aria-hidden="true">1.1.</strong> VAE构建模块</a></li><li class="chapter-item expanded "><a href="vae-elbo.html"><strong aria-hidden="true">1.2.</strong> 置信下限（ELBO）</a></li><li class="chapter-item expanded "><a href="vae-optimization.html"><strong aria-hidden="true">1.3.</strong> VAE优化</a></li><li class="chapter-item expanded "><a href="vae-concluding.html"><strong aria-hidden="true">1.4.</strong> 总结</a></li></ol></li><li class="chapter-item expanded "><a href="ddpm.html"><strong aria-hidden="true">2.</strong> DDPM</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ddpm-building-blocks.html"><strong aria-hidden="true">2.1.</strong> PPDM构建模块</a></li><li class="chapter-item expanded "><a href="ddpm-elbo.html"><strong aria-hidden="true">2.2.</strong> 置信下限（ELBO）</a></li><li class="chapter-item expanded "><a href="ddpm-distribution-of-reverse-process.html"><strong aria-hidden="true">2.3.</strong> 逆向过程的分布</a></li><li class="chapter-item expanded "><a href="ddpm-training-and-inference.html"><strong aria-hidden="true">2.4.</strong> 训练和推理</a></li><li class="chapter-item expanded "><a href="ddim.html"><strong aria-hidden="true">2.5.</strong> DDIM</a></li><li class="chapter-item expanded "><a href="ddpm-concluding.html"><strong aria-hidden="true">2.6.</strong> 总结</a></li></ol></li><li class="chapter-item expanded "><a href="smld.html"><strong aria-hidden="true">3.</strong> SMLD</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="smld-sampling.html"><strong aria-hidden="true">3.1.</strong> 从分布中采样</a></li><li class="chapter-item expanded "><a href=".smld-score-function.html"><strong aria-hidden="true">3.2.</strong> 得分函数</a></li><li class="chapter-item expanded "><a href="smld-score-matching-techniques.html"><strong aria-hidden="true">3.3.</strong> 得分匹配技术</a></li><li class="chapter-item expanded "><a href="smld-concluding.html"><strong aria-hidden="true">3.4.</strong> 总结</a></li></ol></li><li class="chapter-item expanded "><a href="sde.html"><strong aria-hidden="true">4.</strong> SDE</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="sde-ode.html"><strong aria-hidden="true">4.1.</strong> 从迭代算法到ODE</a></li><li class="chapter-item expanded "><a href="what-is-sde.html"><strong aria-hidden="true">4.2.</strong> SDE是什么</a></li><li class="chapter-item expanded "><a href=".sde-for-ddpm-and-smld.html"><strong aria-hidden="true">4.3.</strong> DDPM和SMLD的SDE</a></li><li class="chapter-item expanded "><a href="numerical-solvers-for-ode-and-sde.html"><strong aria-hidden="true">4.4.</strong> ODE和SDE的数值求解器</a></li><li class="chapter-item expanded "><a href="sde-concluding.html"><strong aria-hidden="true">4.5.</strong> 总结</a></li></ol></li><li class="chapter-item expanded "><a href="langevin-and-fokker-planck-equations.html"><strong aria-hidden="true">5.</strong> 朗之万和福克-普朗克方程</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="brownian-motion.html"><strong aria-hidden="true">5.1.</strong> 布朗运动</a></li><li class="chapter-item expanded "><a href="masters-equation.html"><strong aria-hidden="true">5.2.</strong> 马斯特斯方程式</a></li><li class="chapter-item expanded "><a href="kramers-moyal-expansion.html"><strong aria-hidden="true">5.3.</strong> 克拉默斯-莫亚尔展开式</a></li><li class="chapter-item expanded "><a href="fokker-planck-equation.html"><strong aria-hidden="true">5.4.</strong> 福克-普朗克方程</a></li><li class="chapter-item expanded "><a href="langevin-and-fokker-planck-equations-concluding.html"><strong aria-hidden="true">5.5.</strong> 总结</a></li></ol></li><li class="chapter-item expanded "><a href="scm.html"><strong aria-hidden="true">6.</strong> 一致性模型</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="why-scm.html"><strong aria-hidden="true">6.1.</strong> Why</a></li><li class="chapter-item expanded "><a href="scm-mechanic.html"><strong aria-hidden="true">6.2.</strong> 原理</a></li></ol></li><li class="chapter-item expanded "><a href="last-summary.html"><strong aria-hidden="true">7.</strong> 总结</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
