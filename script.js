document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded!");

    const pages = ["home", "wallet","explore", "portfolio", "tracker", "copytrade", "sniper"];

    function showPage(page) {
        console.log("Switching to page:", page);
        console.log("Available Pages:", pages);

        pages.forEach(p => {
            const section = document.getElementById(`${p}-page`);
            console.log(`Checking ${p}-page`, section);

            if (section) {
                section.style.display = (p === page) ? "block" : "none";
            }
        });

        window.history.pushState({page}, "", `/{page}`);

        closeNav();

    }

    window.addEventListener("popstate", (event) => {
        if (event.state && event.state.page) {
            showPage(event.state.page);
        } else {
            showPage("home");
        }
        
    });

    window.openNav  = function() {
        document.getElementById("sidebar").style.right = "0";
        document.getElementById("menu-icon").style.display = "none";

    };

    window.closeNav  = function() {
        document.getElementById("sidebar").style.right = "-250px";
        document.getElementById("menu-icon").style.display = "block";
    };

    document.querySelectorAll("#sidebar a").forEach(link=> {
        link.addEventListener("click", function () {
            const page = this.getAttribute("onclick").match(/'([^']+)'/)[1];
            showPage(page);
        });
    });

    showPage("home");
});


