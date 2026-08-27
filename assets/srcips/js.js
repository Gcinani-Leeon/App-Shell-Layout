// / Script 1: Sidebar Resizer & Mobile Toggle -->
        document.addEventListener('DOMContentLoaded', () => {
            const sidebar = document.getElementById('app-sidebar');
            const resizer = document.getElementById('sidebar-resizer');
            const toggleBtn = document.getElementById('sidebar-toggle');
            const mobileCloseBtn = document.getElementById('mobile-close-btn');
            const backdrop = document.getElementById('sidebar-backdrop');
            const root = document.documentElement;
            
            let isResizing = false;
            const ICON_WIDTH = 70;
            
            resizer.addEventListener('mousedown', (e) => {
                isResizing = true;
                sidebar.classList.add('is-resizing');
                sidebar.style.transition = 'none'; 
                document.body.style.cursor = 'col-resize';
                document.body.style.userSelect = 'none'; 
            });

            document.addEventListener('mousemove', (e) => {
                if (!isResizing) return;
                
                let newWidth = e.clientX;
                
                if (newWidth < 40) {
                    sidebar.setAttribute('data-state', 'collapsed');
                    root.style.setProperty('--sidebar-width', '0px');
                } else if (newWidth >= 40 && newWidth < 140) {
                    sidebar.setAttribute('data-state', 'icon-only');
                    root.style.setProperty('--sidebar-width', `${ICON_WIDTH}px`);
                } else {
                    sidebar.setAttribute('data-state', 'expanded');
                    if (newWidth > 500) newWidth = 500;
                    root.style.setProperty('--sidebar-width', `${newWidth}px`);
                }
            });

            document.addEventListener('mouseup', () => {
                if (isResizing) {
                    isResizing = false;
                    sidebar.classList.remove('is-resizing');
                    sidebar.style.transition = ''; 
                    document.body.style.cursor = '';
                    document.body.style.userSelect = '';
                }
            });

            const toggleSidebar = () => {
                const isMobile = window.innerWidth <= 768;
                
                if (isMobile) {
                    sidebar.classList.toggle('mobile-open');
                    backdrop.classList.toggle('active');
                } else {
                    const currentState = sidebar.getAttribute('data-state');
                    if (currentState === 'expanded') {
                        sidebar.setAttribute('data-state', 'icon-only');
                        root.style.setProperty('--sidebar-width', `${ICON_WIDTH}px`);
                    } else {
                        sidebar.setAttribute('data-state', 'expanded');
                        root.style.setProperty('--sidebar-width', '260px'); 
                    }
                }
            };

            toggleBtn.addEventListener('click', toggleSidebar);
            mobileCloseBtn.addEventListener('click', toggleSidebar);
            backdrop.addEventListener('click', toggleSidebar);
        });
    











    // <!-- Script 2: Accordion Submenu Logic -->
        const navToggleBtns = document.querySelectorAll('.ui-nav-toggle-btn');
        const sidebarRef = document.getElementById('app-sidebar');
        const docRoot = document.documentElement;

        navToggleBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault(); 
                
                const navGroup = btn.closest('.ui-nav-group');
                const isCurrentlyOpen = navGroup.classList.contains('is-open');
                
                navGroup.classList.toggle('is-open');
                btn.setAttribute('aria-expanded', !isCurrentlyOpen);
                
                if (sidebarRef.getAttribute('data-state') === 'icon-only') {
                    sidebarRef.setAttribute('data-state', 'expanded');
                    docRoot.style.setProperty('--sidebar-width', '260px');
                }
            });
        });
        









    // <!-- Script 3: Profile Dropdown Logic -->
        const profileBtn = document.getElementById('profile-menu-btn');
        const profileMenu = document.getElementById('profile-menu');

        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            const isExpanded = profileMenu.classList.contains('is-active');
            
            if (isExpanded) {
                profileMenu.classList.remove('is-active');
                profileBtn.setAttribute('aria-expanded', 'false');
            } else {
                profileMenu.classList.add('is-active');
                profileBtn.setAttribute('aria-expanded', 'true');
            }
        });

        document.addEventListener('click', (e) => {
            if (profileMenu.classList.contains('is-active') && !profileMenu.contains(e.target)) {
                profileMenu.classList.remove('is-active');
                profileBtn.setAttribute('aria-expanded', 'false');
            }
        });








    // <!-- Script 4: Search Shortcut Logic -->
        const searchInput = document.getElementById('global-search');

        document.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault(); 
                searchInput.focus();
            }
        });









    // Script 5: Theme Switcher Logic
        const themeBtn = document.getElementById('theme-toggle-btn');
        const themeMenu = document.getElementById('theme-menu');
        const themeOptions = document.querySelectorAll('.ui-dropdown-item');
        const htmlElement = document.documentElement;

        const savedTheme = localStorage.getItem('ui-theme') || 'system';
        applyTheme(savedTheme);
        updateActiveOption(savedTheme);

        themeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            themeMenu.classList.toggle('is-active');
        });

        document.addEventListener('click', (e) => {
            if (themeMenu.classList.contains('is-active') && !themeMenu.contains(e.target)) {
                themeMenu.classList.remove('is-active');
            }
        });

        themeOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                const selectedTheme = e.currentTarget.getAttribute('data-theme-val');
                
                localStorage.setItem('ui-theme', selectedTheme);
                applyTheme(selectedTheme);
                updateActiveOption(selectedTheme);
                
                themeMenu.classList.remove('is-active'); 
            });
        });

        function applyTheme(theme) {
            if (theme === 'system') {
                const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                htmlElement.setAttribute('data-theme', isSystemDark ? 'dark' : 'light');
            } else {
                htmlElement.setAttribute('data-theme', theme);
            }
        }

        function updateActiveOption(theme) {
            themeOptions.forEach(opt => {
                if (opt.getAttribute('data-theme-val') === theme) {
                    opt.classList.add('active');
                } else {
                    opt.classList.remove('active');
                }
            });
        }

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            if (localStorage.getItem('ui-theme') === 'system' || !localStorage.getItem('ui-theme')) {
                applyTheme('system');
            }
        });










