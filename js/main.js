// Import router
import { initializeRouter } from './router.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed.");

    // --- Configuration ---
    const criticalComponents = [
        { id: 'navigation-placeholder', path: 'components/layout/navigation.html', priority: 1 },
        { id: 'home-placeholder', path: 'components/sections/home.html', priority: 1 },
        { id: 'booking-modal-placeholder', path: 'components/layout/booking-modal.html', priority: 1 }
    ];

    const nonCriticalComponents = [
        { id: 'locations-placeholder', path: 'components/sections/locations.html', priority: 2 },
        { id: 'about-placeholder', path: 'components/sections/about.html', priority: 2 },
        { id: 'menu-placeholder', path: 'components/sections/menu.html', priority: 2 },
        { id: 'technicians-placeholder', path: 'components/sections/technicians.html', priority: 3 },
        { id: 'reviews-placeholder', path: 'components/sections/reviews.html', priority: 3 },
        { id: 'instagram-placeholder', path: 'components/sections/instagram.html', priority: 3 },
        { id: 'aftercare-placeholder', path: 'components/sections/aftercare.html', priority: 3 },
        { id: 'contact-placeholder', path: 'components/sections/contact.html', priority: 2 },
        { id: 'footer-placeholder', path: 'components/layout/footer.html', priority: 2 },
        { id: 'policy-modal-placeholder', path: 'components/layout/policy-modal.html', priority: 3 },
        { id: 'shop-modal-placeholder', path: 'components/layout/shop-modal.html', priority: 3 },
        { id: 'faq-modal-placeholder', path: 'components/layout/faq-modal.html', priority: 3 }
    ];

    // IMPORTANT: Replace with your actual URLs!
    const bookingLinks = {
        'Irvine': 'https://book.squareup.com/appointments/f80ffd17-8030-41a2-ba19-12bd5541cb16/location/LC0CZ4AZ7TKXS/services',
        'Tustin': 'https://book.squareup.com/appointments/f80ffd17-8030-41a2-ba19-12bd5541cb16/location/G0X353MBKGTCW/services',
        'Santa Ana': 'https://book.squareup.com/appointments/f80ffd17-8030-41a2-ba19-12bd5541cb16/location/LZMX8CTA69S7E/services',
        'Costa Mesa': 'https://book.squareup.com/appointments/f80ffd17-8030-41a2-ba19-12bd5541cb16/location/LVMKS7ERWS3KP/services'
    };
    const yelpProfileUrl = 'https://www.yelp.com/biz/elegant-lashes-by-katie-irvine-irvine';

    // Cache for loaded components
    const componentCache = new Map();

    // --- Component Loading Function ---
    const loadComponent = async ({ id, path, priority }) => {
        const placeholder = document.getElementById(id);
        if (!placeholder) {
            console.error(`Placeholder element with ID "${id}" not found.`);
            return;
        }

        // Add loading indicator
        placeholder.innerHTML = `
            <div class="loading-indicator" role="status">
                <div class="animate-pulse flex space-y-4">
                    <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div class="space-y-2">
                        <div class="h-4 bg-gray-200 rounded"></div>
                        <div class="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                </div>
            </div>`;

        try {
            let html;
            if (componentCache.has(path)) {
                html = componentCache.get(path);
            } else {
                const response = await fetch(path);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status} for ${path}`);
                }
                html = await response.text();
                componentCache.set(path, html);
            }

            placeholder.innerHTML = html;
            placeholder.classList.remove('placeholder-loading');
            placeholder.classList.add('placeholder-loaded');
            console.log(`Loaded component: ${path} (priority ${priority})`);
        } catch (error) {
            console.error(`Failed to load component "${path}":`, error);
            placeholder.innerHTML = `<p class="text-center text-red-600 p-4 font-semibold">Error loading content.</p>`;
            placeholder.classList.remove('placeholder-loading');
            placeholder.classList.add('placeholder-error');
        }
    };

    // Function to load components by priority
    async function loadComponentsByPriority(components) {
        // Group components by priority
        const priorityGroups = new Map();
        components.forEach(comp => {
            if (!priorityGroups.has(comp.priority)) {
                priorityGroups.set(comp.priority, []);
            }
            priorityGroups.get(comp.priority).push(comp);
        });

        // Load components in priority order
        for (let priority = 1; priority <= Math.max(...priorityGroups.keys()); priority++) {
            const groupComponents = priorityGroups.get(priority) || [];
            await Promise.all(groupComponents.map(comp => loadComponent(comp)));
        }
    }

    // --- Initialization Functions ---

    function initializeMobileMenu() {
        const navPlaceholder = document.getElementById('navigation-placeholder');
        if (!navPlaceholder) return; // Need the navigation loaded

        const mobileMenuButton = navPlaceholder.querySelector('#mobile-menu-button');
        const mobileMenu = navPlaceholder.querySelector('#mobile-menu'); // Ensure selecting within the loaded nav

        if (mobileMenuButton && mobileMenu) {
            const menuIconOpen = mobileMenuButton.querySelector('svg.block');
            const menuIconClose = mobileMenuButton.querySelector('svg.hidden');

            mobileMenuButton.addEventListener('click', () => {
                const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
                mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
                mobileMenu.classList.toggle('hidden');
                menuIconOpen?.classList.toggle('hidden');
                menuIconClose?.classList.toggle('hidden');
            });

            // Use event delegation on the menu itself for potentially loaded links/buttons
            mobileMenu.addEventListener('click', (event) => {
                 // Check if the clicked element is a link or a button meant to close the menu
                if (event.target.closest('a') || event.target.closest('button.open-modal-button')) {
                    mobileMenuButton.setAttribute('aria-expanded', 'false');
                    mobileMenu.classList.add('hidden');
                    menuIconOpen?.classList.remove('hidden');
                    menuIconClose?.classList.add('hidden');
                    // Note: Modal opening logic is handled separately in initializeBookingModal
                }
            });
             console.log("Mobile menu initialized.");
        } else {
            console.warn("Mobile menu button or menu element not found within navigation placeholder.");
        }
    }

    function initializeBookingModal() {
        const bookingModalPlaceholder = document.getElementById('booking-modal-placeholder');
        if (!bookingModalPlaceholder) {
            console.warn("Booking modal placeholder not found.");
            return;
        }

        const bookingModal = bookingModalPlaceholder.querySelector('#booking-modal');
        if (!bookingModal) {
            console.warn("Booking modal element not found within placeholder.");
            return;
        }

        const modalOverlay = bookingModal.querySelector('.modal-overlay');
        const modalCloseButton = bookingModal.querySelector('.modal-close');
        
        // Query for open buttons after all components are loaded
        const openModalButtons = document.querySelectorAll('.open-modal-button, .main-book-now-btn');
        const locationSelectButtonsModal = bookingModal.querySelectorAll('.location-select-button');
        const locationSelectButtonsPage = document.querySelectorAll('#locations-placeholder .location-select-button');

        const openModal = (button) => {
            // If the button has a data-service attribute, store it in the modal
            if (button && button.hasAttribute('data-service')) {
                const serviceName = button.getAttribute('data-service');
                bookingModal.setAttribute('data-selected-service', serviceName);
            }
            
            bookingModal.classList.remove('hidden');
            requestAnimationFrame(() => {
                bookingModal.classList.add('active');
            });
            document.body.style.overflow = 'hidden';
        }
        
        const closeModal = () => {
            bookingModal.classList.remove('active');
            bookingModal.addEventListener('transitionend', () => {
                bookingModal.classList.add('hidden');
                // Reset scroll position when modal is closed
                const modalContainer = bookingModal.querySelector('.modal-container');
                if (modalContainer) {
                    modalContainer.scrollTop = 0;
                }
                // Clear the selected service when modal is closed
                bookingModal.removeAttribute('data-selected-service');
            }, { once: true });
            document.body.style.overflow = '';
        }

        // Attach listeners to ALL buttons that should open the modal
        openModalButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                openModal(button);
            });
        });

        // Add close handlers regardless of how the modal was opened
        if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
        if (modalCloseButton) modalCloseButton.addEventListener('click', closeModal);

        // Handle location selection from Modal buttons
        if (locationSelectButtonsModal) {
            locationSelectButtonsModal.forEach(button => {
                button.addEventListener('click', () => {
                    const location = button.getAttribute('data-location');
                    const url = bookingLinks[location];
                    if (url && !url.toUpperCase().includes('YOUR_')) {
                        // Get the selected service if any
                        const selectedService = bookingModal.getAttribute('data-selected-service');
                        let bookingUrl = url;
                        
                        // If a service was selected, append it to the URL
                        if (selectedService) {
                            // Encode the service name for the URL
                            const encodedService = encodeURIComponent(selectedService);
                            bookingUrl += `?service=${encodedService}`;
                        }
                        
                        console.log(`Redirecting to ${location} booking: ${bookingUrl}`);
                        window.open(bookingUrl, '_blank');
                        closeModal();
                    } else {
                        console.warn(`Booking link for ${location} is not set up or is a placeholder.`);
                        alert(`Online booking for ${location} is coming soon! Please call or text 657-334-9919 to book.`);
                    }
                });
            });
        }

        // Handle location selection from Location Section buttons
        if (locationSelectButtonsPage) {
            locationSelectButtonsPage.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    openModal();
                });
            });
        }

        // Add escape key listener
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !bookingModal.classList.contains('hidden')) {
                closeModal();
            }
        });

        // Expose the close function globally for other components to use
        window.closeBookingModal = closeModal;

        console.log("Booking modal initialized.");
    }

    function initializePolicyModal() {
        const policyModalPlaceholder = document.getElementById('policy-modal-placeholder');
        if (!policyModalPlaceholder) {
            console.warn("Policy modal placeholder not found.");
            return;
        }

        const policyModal = policyModalPlaceholder.querySelector('#policy-modal');
        if (!policyModal) {
            console.warn("Policy modal element not found within placeholder.");
            return;
        }

        const modalOverlay = policyModal.querySelector('.modal-overlay');
        const modalCloseButton = policyModal.querySelector('.modal-close');
        const openModalButtons = document.querySelectorAll('.open-policy-modal');

        const openModal = () => {
            policyModal.classList.remove('hidden');
            requestAnimationFrame(() => {
                policyModal.classList.add('active');
            });
            document.body.style.overflow = 'hidden';
        }
        
        const closeModal = () => {
            policyModal.classList.remove('active');
            policyModal.addEventListener('transitionend', () => {
                policyModal.classList.add('hidden');
                // Reset scroll position when modal is closed
                const modalContainer = policyModal.querySelector('.modal-container');
                if (modalContainer) {
                    modalContainer.scrollTop = 0;
                }
            }, { once: true });
            document.body.style.overflow = '';
        }

        openModalButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                openModal();
            });
        });

        if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
        if (modalCloseButton) modalCloseButton.addEventListener('click', closeModal);

        // Add escape key listener
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !policyModal.classList.contains('hidden')) {
                closeModal();
            }
        });

        console.log("Policy modal initialized.");
    }

    function initializeShopModal() {
        const shopModalPlaceholder = document.getElementById('shop-modal-placeholder');
        if (!shopModalPlaceholder) {
            console.warn("Shop modal placeholder not found.");
            return;
        }

        const shopModal = shopModalPlaceholder.querySelector('#shop-modal');
        if (!shopModal) {
            console.warn("Shop modal element not found within placeholder.");
            return;
        }

        const modalOverlay = shopModal.querySelector('.modal-overlay');
        const modalCloseButton = shopModal.querySelector('.modal-close');
        const openModalButtons = document.querySelectorAll('.open-shop-modal');

        const openModal = () => {
            shopModal.classList.remove('hidden');
            requestAnimationFrame(() => {
                shopModal.classList.add('active');
            });
            document.body.style.overflow = 'hidden';
        }
        
        const closeModal = () => {
            shopModal.classList.remove('active');
            shopModal.addEventListener('transitionend', () => {
                shopModal.classList.add('hidden');
                // Reset scroll position when modal is closed
                const modalContainer = shopModal.querySelector('.modal-container');
                if (modalContainer) {
                    modalContainer.scrollTop = 0;
                }
            }, { once: true });
            document.body.style.overflow = '';
        }

        openModalButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                openModal();
            });
        });

        if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
        if (modalCloseButton) modalCloseButton.addEventListener('click', closeModal);

        // Add escape key listener
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !shopModal.classList.contains('hidden')) {
                closeModal();
            }
        });

        console.log("Shop modal initialized.");
    }

    function initializeFAQModal() {
        const faqModalPlaceholder = document.getElementById('faq-modal-placeholder');
        if (!faqModalPlaceholder) {
            console.warn("FAQ modal placeholder not found.");
            return;
        }

        const faqModal = faqModalPlaceholder.querySelector('#faq-modal');
        if (!faqModal) {
            console.warn("FAQ modal element not found within placeholder.");
            return;
        }

        const modalOverlay = faqModal.querySelector('.modal-overlay');
        const modalCloseButton = faqModal.querySelector('.modal-close');
        const openModalButtons = document.querySelectorAll('.open-faq-modal');

        // Initialize FAQ dropdowns
        const faqQuestions = faqModal.querySelectorAll('.faq-question');
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const isExpanded = question.getAttribute('aria-expanded') === 'true';
                
                // Toggle current question
                question.setAttribute('aria-expanded', !isExpanded);
                answer.classList.toggle('show');
                
                // Optional: Close other open questions
                if (!isExpanded) {
                    faqQuestions.forEach(otherQuestion => {
                        if (otherQuestion !== question && otherQuestion.getAttribute('aria-expanded') === 'true') {
                            otherQuestion.setAttribute('aria-expanded', 'false');
                            otherQuestion.nextElementSibling.classList.remove('show');
                        }
                    });
                }
            });
        });

        const openModal = () => {
            faqModal.classList.remove('hidden');
            requestAnimationFrame(() => {
                faqModal.classList.add('active');
            });
            document.body.style.overflow = 'hidden';
        }
        
        const closeModal = () => {
            faqModal.classList.remove('active');
            faqModal.addEventListener('transitionend', () => {
                faqModal.classList.add('hidden');
                // Reset scroll position when modal is closed
                const modalContainer = faqModal.querySelector('.modal-container');
                if (modalContainer) {
                    modalContainer.scrollTop = 0;
                }
                // Reset all FAQ questions to closed state
                faqQuestions.forEach(question => {
                    question.setAttribute('aria-expanded', 'false');
                    question.nextElementSibling.classList.remove('show');
                });
            }, { once: true });
            document.body.style.overflow = '';
        }

        openModalButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                openModal();
            });
        });

        if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
        if (modalCloseButton) modalCloseButton.addEventListener('click', closeModal);

        // Add escape key listener
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !faqModal.classList.contains('hidden')) {
                closeModal();
            }
        });

        console.log("FAQ modal initialized.");
    }

    function updateYelpLinks() {
        // Update the main Yelp link in the reviews section
        const reviewsPlaceholder = document.getElementById('reviews-placeholder');
        if (reviewsPlaceholder) {
            const mainYelpLink = reviewsPlaceholder.querySelector('a[href*="yelp.com"]'); // Robust selector
            if (mainYelpLink) {
                if (yelpProfileUrl && !yelpProfileUrl.toUpperCase().includes('YOUR_')) {
                    mainYelpLink.href = yelpProfileUrl;
                    mainYelpLink.target = '_blank';
                    mainYelpLink.rel = 'noopener noreferrer';
                } else {
                    mainYelpLink.removeAttribute('href');
                    mainYelpLink.style.pointerEvents = 'none';
                    mainYelpLink.style.opacity = '0.6';
                    mainYelpLink.style.textDecoration = 'line-through';
                    console.warn("Main Yelp Profile URL is not configured.");
                }
            }
        }

        // Update the Yelp link in the footer
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            const footerYelpLink = footerPlaceholder.querySelector('footer a[href*="yelp.com"]'); // Robust selector
            if (footerYelpLink) {
                if (yelpProfileUrl && !yelpProfileUrl.toUpperCase().includes('YOUR_')) {
                    footerYelpLink.href = yelpProfileUrl;
                    footerYelpLink.target = '_blank';
                    footerYelpLink.rel = 'noopener noreferrer';
                } else {
                    footerYelpLink.style.display = 'none'; // Hide link if not configured
                }
            }
        }
         console.log("Yelp links updated.");
    }

    function initializeScrollSpy() {
        const sections = document.querySelectorAll('section[id]'); // Select all sections by ID attribute
        const navPlaceholder = document.getElementById('navigation-placeholder');

        if (!navPlaceholder || sections.length === 0) {
            console.warn("Navigation placeholder or sections not found. Scroll spy disabled.");
            return;
        }

        const navLinks = navPlaceholder.querySelectorAll('nav a.nav-link'); // Select links within the loaded nav
        const navElement = navPlaceholder.querySelector('nav');
        const navHeight = navElement?.offsetHeight || 64;

        if (navLinks.length === 0) {
            console.warn("Navigation links not found within navigation placeholder. Scroll spy disabled.");
            return;
        }

        let currentActiveSectionId = ''; // Store the ID of the currently active section

        const observerOptions = {
            root: null, // Use the viewport as the root
            rootMargin: `-${navHeight + 60}px 0px -45% 0px`, // Adjust margins: top margin accounts for nav+buffer, bottom margin makes it trigger earlier
            threshold: 0 // Trigger as soon as the element enters/leaves the intersection area
        };

        const intersectionCallback = (entries) => {
            let intersectingEntries = entries.filter(entry => entry.isIntersecting);

            if (intersectingEntries.length > 0) {
                // Find the entry that is "most" visible (closest to the top edge defined by rootMargin)
                intersectingEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                currentActiveSectionId = intersectingEntries[0].target.getAttribute('id');
            } else {
                // If nothing is intersecting within the rootMargin (scrolled past the last section),
                // keep the last active section highlighted, unless scrolled near the very top.
                 if (window.scrollY < sections[0].offsetTop - navHeight - 50) {
                    currentActiveSectionId = sections[0].getAttribute('id') || 'home'; // Default to home if scrolled way up
                }
                // Otherwise, currentActiveSectionId retains its last value
            }

             // Update nav links based ONLY on the determined currentActiveSectionId
             navLinks.forEach(link => {
                 const linkHref = link.getAttribute('href');
                 const isActive = linkHref === `#${currentActiveSectionId}`;
                 link.classList.toggle('nav-active', isActive);
                 link.classList.toggle('text-primary', isActive);
                 link.classList.toggle('border-transparent', !isActive);
                 link.classList.toggle('text-darktext', !isActive);
             });
        };

        const observer = new IntersectionObserver(intersectionCallback, observerOptions);
        sections.forEach(section => observer.observe(section));

        // Initial check for highlighting when page loads (useful for hashed URLs)
        const initialHash = window.location.hash;
        let initialActiveId = 'home'; // Default to home

        if (initialHash && document.getElementById(initialHash.substring(1))) {
            initialActiveId = initialHash.substring(1);
            // Attempt to scroll into view slightly below the nav bar
            const targetElement = document.getElementById(initialActiveId);
            if (targetElement) {
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - navHeight - 20; // 20px buffer

                // Use timeout to ensure rendering is complete after component load
                setTimeout(() => {
                     window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth' // Or 'auto' for instant jump
                    });
                }, 100); // Small delay
            }
        }

        // Apply initial highlighting
        navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${initialActiveId}`;
            link.classList.toggle('nav-active', isActive);
            link.classList.toggle('text-primary', isActive);
            link.classList.toggle('border-transparent', !isActive);
            link.classList.toggle('text-darktext', !isActive);
        });
        currentActiveSectionId = initialActiveId; // Set the initial active ID tracker

         console.log(`Scroll spy initialized. Initial section: ${currentActiveSectionId}`);
    }

    // Reviews Section Location Tabs
    function initializeReviewTabs() {
        const reviewsSection = document.getElementById('reviews');
        if (!reviewsSection) {
            console.warn('Reviews section not found');
            return;
        }

        const locationTabs = reviewsSection.querySelectorAll('.location-tab');
        const reviewContainers = reviewsSection.querySelectorAll('.location-reviews');

        // Function to show reviews for a specific location
        const showLocationReviews = (locationId) => {
            // Hide all review containers
            reviewContainers.forEach(container => {
                container.classList.remove('active');
                container.style.display = 'none';
            });

            // Remove active class from all tabs
            locationTabs.forEach(tab => {
                tab.classList.remove('active');
            });

            // Show selected location's reviews
            const selectedContainer = reviewsSection.querySelector(`.location-reviews[data-location="${locationId}"]`);
            if (selectedContainer) {
                selectedContainer.classList.add('active');
                selectedContainer.style.display = 'block';
            }

            // Add active class to selected tab
            const selectedTab = reviewsSection.querySelector(`.location-tab[data-location="${locationId}"]`);
            if (selectedTab) {
                selectedTab.classList.add('active');
            }
        };

        // Add click event listeners to location tabs
        locationTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const locationId = tab.getAttribute('data-location');
                showLocationReviews(locationId);
            });
        });

        // Show Irvine reviews by default
        showLocationReviews('irvine');
    }

    // Yelp Reviews Modal
    function initializeYelpModal() {
        const modal = document.getElementById('yelp-modal');
        const openButton = document.getElementById('open-yelp-modal');
        const closeButton = document.getElementById('close-yelp-modal');

        if (!modal || !openButton || !closeButton) return;

        openButton.addEventListener('click', () => {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.style.overflow = 'hidden';
        });

        const closeModal = () => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = '';
        };

        closeButton.addEventListener('click', closeModal);

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                closeModal();
            }
        });
    }

    function initializeTeamToggles() {
        const techniciansSection = document.getElementById('technicians');
        if (!techniciansSection) {
            console.warn("Technicians section not found");
            return;
        }

        const toggleButtons = techniciansSection.querySelectorAll('.team-location-toggle');
        let currentlyExpanded = null;
        
        function collapseSection(wrapper) {
            const content = wrapper.querySelector('.team-members');
            wrapper.style.height = '0px';
            wrapper.classList.remove('expanded');
            wrapper.previousElementSibling.setAttribute('aria-expanded', 'false');
        }

        function expandSection(wrapper) {
            const content = wrapper.querySelector('.team-members');
            wrapper.classList.add('expanded');
            wrapper.style.height = content.offsetHeight + 'px';
            wrapper.previousElementSibling.setAttribute('aria-expanded', 'true');
        }
        
        toggleButtons.forEach(button => {
            button.addEventListener('click', function() {
                const wrapper = this.nextElementSibling;
                
                // If clicking the same button that's already expanded, collapse it
                if (this.getAttribute('aria-expanded') === 'true') {
                    collapseSection(wrapper);
                    currentlyExpanded = null;
                    return;
                }
                
                // If there's a different section expanded, collapse it
                if (currentlyExpanded) {
                    collapseSection(currentlyExpanded);
                }
                
                // Expand the clicked section
                expandSection(wrapper);
                currentlyExpanded = wrapper;
            });
        });

        // Handle resize events to update heights
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (currentlyExpanded) {
                    const content = currentlyExpanded.querySelector('.team-members');
                    currentlyExpanded.style.height = content.offsetHeight + 'px';
                }
            }, 250);
        });
        
        console.log("Team toggles initialized");
    }

    // Add scroll handler for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    function initializeMenuCollapsible() {
        const serviceHeaders = document.querySelectorAll('.service-header');
        
        if (serviceHeaders.length === 0) {
            console.warn('No service headers found for collapsible menu');
            return;
        }
        
        // Initialize all headers with a unique ID
        serviceHeaders.forEach((header, index) => {
            header.setAttribute('data-service-id', `service-${index}`);
            header.setAttribute('aria-expanded', 'false');
        });
        
        serviceHeaders.forEach(header => {
            header.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent event bubbling
                
                const serviceId = this.getAttribute('data-service-id');
                const content = this.nextElementSibling;
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                
                // Toggle only this specific service
                if (isExpanded) {
                    // Collapse
                    this.setAttribute('aria-expanded', 'false');
                    this.classList.remove('expanded');
                    content.classList.remove('expanded');
                } else {
                    // Expand
                    this.setAttribute('aria-expanded', 'true');
                    this.classList.add('expanded');
                    content.classList.add('expanded');
                    
                    // Scroll into view if needed
                    setTimeout(() => {
                        const headerRect = this.getBoundingClientRect();
                        const windowHeight = window.innerHeight;
                        
                        if (headerRect.bottom > windowHeight * 0.8) {
                            this.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    }, 300);
                }
            });
        });
        
        // Add click handler to the document to close expanded services when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.service-header') && !e.target.closest('.service-content')) {
                serviceHeaders.forEach(header => {
                    if (header.getAttribute('aria-expanded') === 'true') {
                        header.setAttribute('aria-expanded', 'false');
                        header.classList.remove('expanded');
                        header.nextElementSibling.classList.remove('expanded');
                    }
                });
            }
        });
        
        console.log('Menu collapsible functionality initialized');
    }

    function initializeTeamLocationModals() {
        const locationBtns = document.querySelectorAll('.location-btn');
        const modals = document.querySelectorAll('.modal');
        const modalCloseButtons = document.querySelectorAll('.modal-close');
        const modalOverlays = document.querySelectorAll('.modal-overlay');

        // Open modal function
        function openModal(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                // Reset scroll position of modal content
                const modalContainer = modal.querySelector('.modal-container');
                if (modalContainer) {
                    modalContainer.scrollTop = 0;
                }
                
                modal.classList.remove('hidden');
                requestAnimationFrame(() => {
                    modal.classList.add('active');
                });
                document.body.style.overflow = 'hidden';
            }
        }

        // Close modal function
        function closeModal(modal) {
            if (modal) {
                modal.classList.remove('active');
                modal.addEventListener('transitionend', () => {
                    modal.classList.add('hidden');
                    // Reset scroll position when modal is closed
                    const modalContainer = modal.querySelector('.modal-container');
                    if (modalContainer) {
                        modalContainer.scrollTop = 0;
                    }
                }, { once: true });
                document.body.style.overflow = '';
            }
        }

        // Add click event listeners to location buttons
        locationBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = btn.getAttribute('data-modal-target');
                openModal(modalId);
            });
        });

        // Add click event listeners to close buttons
        modalCloseButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const modal = btn.closest('.modal');
                closeModal(modal);
            });
        });

        // Add click event listeners to modal overlays
        modalOverlays.forEach(overlay => {
            overlay.addEventListener('click', () => {
                const modal = overlay.closest('.modal');
                closeModal(modal);
            });
        });

        // Close modal on escape key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                modals.forEach(modal => {
                    if (modal.classList.contains('active')) {
                        closeModal(modal);
                    }
                });
            }
        });

        console.log("Team location modals initialized.");
    }

    // --- Main Execution Flow ---
    console.log("Starting component loading...");
    
    // Load critical components first
    loadComponentsByPriority([...criticalComponents, ...nonCriticalComponents])
        .then(() => {
            console.log('All components loaded.');
            console.log('Initializing application features...');

            // Initialize JS features that depend on the loaded components
            initializeMobileMenu();
            initializeBookingModal();

            // Initialize non-critical features after a short delay
            setTimeout(() => {
                initializePolicyModal();
                initializeShopModal();
                initializeFAQModal();
                initializeScrollSpy();
                initializeReviewTabs();
                initializeYelpModal();
                initializeTeamToggles();
                updateYelpLinks();
                initializeMenuCollapsible();
                initializeTeamLocationModals();

                // Initialize router last
                initializeRouter();

                console.log('Application initialization complete.');
            }, 100);
        })
        .catch(error => {
            console.error('Critical error during component loading phase:', error);
            document.body.innerHTML = '<p class="text-center text-red-600 p-8 font-bold text-xl">Sorry, the page could not be loaded completely. Please try refreshing.</p>';
        });

}); // End DOMContentLoaded listener