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
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><div><strong aria-hidden="true">1.</strong> 哈密顿蒙特卡罗导论</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="hmm/introduction.html"><strong aria-hidden="true">1.1.</strong> 介绍</a></li><li class="chapter-item expanded "><a href="hmm/mcmc-background.html"><strong aria-hidden="true">1.2.</strong> 介绍马尔可夫链蒙特卡罗的背景</a></li><li class="chapter-item expanded "><a href="hmm/metropolis-hastings.html"><strong aria-hidden="true">1.3.</strong> Metropolis-Hastings算法</a></li><li class="chapter-item expanded "><a href="hmm/langevin.html"><strong aria-hidden="true">1.4.</strong> Metropolis调整的朗之万算法</a></li><li class="chapter-item expanded "><a href="hmm/hmm.html"><strong aria-hidden="true">1.5.</strong> 哈密顿蒙特卡罗</a></li><li class="chapter-item expanded "><a href="hmm/mhmc.html"><strong aria-hidden="true">1.6.</strong> 磁性哈密顿蒙特卡罗</a></li><li class="chapter-item expanded "><a href="hmm/qihmc.html"><strong aria-hidden="true">1.7.</strong> 量子启发哈密顿蒙特卡罗</a></li><li class="chapter-item expanded "><a href="hmm/sshhmc.html"><strong aria-hidden="true">1.8.</strong> 可分离影子哈密顿混合蒙特卡罗</a></li><li class="chapter-item expanded "><a href="hmm/no-u-turn-sampler.html"><strong aria-hidden="true">1.9.</strong> 无U转采样器算法</a></li><li class="chapter-item expanded "><a href="hmm/ahmc.html"><strong aria-hidden="true">1.10.</strong> 反对称哈密顿蒙特卡罗</a></li><li class="chapter-item expanded "><a href="hmm/book-objectives.html"><strong aria-hidden="true">1.11.</strong> 本书目标</a></li><li class="chapter-item expanded "><a href="hmm/book-contributions.html"><strong aria-hidden="true">1.12.</strong> 本书贡献</a></li><li class="chapter-item expanded "><a href="hmm/conclusion.html"><strong aria-hidden="true">1.13.</strong> 总结</a></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">2.</strong> 采样基准和性能指标</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="benchmarks/problems-and-datasets.html"><strong aria-hidden="true">2.1.</strong> 基准问题和数据集</a></li><li class="chapter-item expanded "><a href="benchmarks/performance-metrics.html"><strong aria-hidden="true">2.2.</strong> 性能指标</a></li><li class="chapter-item expanded "><a href="benchmarks/parameter-tuning.html"><strong aria-hidden="true">2.3.</strong> 算法参数调整</a></li><li class="chapter-item expanded "><a href="benchmarks/conclusion.html"><strong aria-hidden="true">2.4.</strong> 总结</a></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">3.</strong> 随机波动Metropolis-Hastings</div></li></ol>';
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
