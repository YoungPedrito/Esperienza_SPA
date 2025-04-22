document.addEventListener('DOMContentLoaded', function() {
    // Crea un indicatore di scorrimento elegante
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    scrollIndicator.innerHTML = `
        <div class="scroll-text">Scorri verso il basso per trovare il bottone "Prenota ora"</div>
        <div class="scroll-arrow">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5L12 19" stroke="#b08878" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M19 12L12 19L5 12" stroke="#b08878" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
    `;
    document.body.appendChild(scrollIndicator);

    // Nascondi l'indicatore quando l'utente scorre abbastanza
    let scrollThreshold = window.innerHeight * 0.5;
    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            scrollIndicator.style.opacity = '0';
            setTimeout(() => {
                scrollIndicator.style.display = 'none';
            }, 500);
        }
    });

    // Aggiungi un'animazione più evidente all'indicatore di scorrimento
    setTimeout(() => {
        const scrollArrow = document.querySelector('.scroll-arrow');
        if (scrollArrow) {
            scrollArrow.style.transform = 'scale(1.2)';
            setTimeout(() => {
                scrollArrow.style.transform = 'scale(1)';
            }, 500);
        }
    }, 1500);

    // Disabilita tutti i link tranne il bottone "Prenota ora"
    const allLinks = document.querySelectorAll('a:not([style*="Prenota ora"])');
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Non mostrare alcun messaggio quando si cliccano altri link
        });
    });

    // Crea un elemento per il messaggio
    function showMessage(text) {
        let messageBox = document.getElementById('aloe-demo-message');
        if (!messageBox) {
            messageBox = document.createElement('div');
            messageBox.id = 'aloe-demo-message';
            messageBox.style.position = 'fixed';
            messageBox.style.top = '20%';
            messageBox.style.left = '50%';
            messageBox.style.transform = 'translateX(-50%)';
            messageBox.style.backgroundColor = 'rgba(176, 136, 120, 0.9)';
            messageBox.style.color = 'white';
            messageBox.style.padding = '20px';
            messageBox.style.borderRadius = '5px';
            messageBox.style.zIndex = '10000';
            messageBox.style.maxWidth = '80%';
            messageBox.style.textAlign = 'center';
            messageBox.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            document.body.appendChild(messageBox);
        }

        messageBox.textContent = text;

        // Nascondi il messaggio dopo 3 secondi
        setTimeout(() => {
            messageBox.style.display = 'none';
        }, 3000);
    }

    // Funzione per evidenziare il bottone quando è visibile
    function highlightButtonWhenVisible() {
        const prenotaButton = document.getElementById('aloe-demo-button');
        if (!prenotaButton) return;

        // Funzione per verificare se un elemento è visibile nella viewport
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }

        // Controlla se il bottone è visibile e aggiungi l'effetto
        function checkVisibility() {
            if (isElementInViewport(prenotaButton)) {
                if (!prenotaButton.classList.contains('aloe-pulse')) {
                    addGlowEffect(prenotaButton);
                    prenotaButton.classList.add('aloe-pulse');
                    // Non mostrare alcun messaggio quando il bottone diventa visibile
                }
            }
        }

        // Controlla all'inizio e ad ogni scroll
        checkVisibility();
        window.addEventListener('scroll', checkVisibility);
    }

    // Trova il bottone "Prenota ora"
    const prenotaButton = document.getElementById('aloe-demo-button');

    if (prenotaButton) {
        // Attiva la funzione che evidenzia il bottone quando diventa visibile
        highlightButtonWhenVisible();

        // Modifica il comportamento del bottone "Prenota ora"
        prenotaButton.addEventListener('click', function(e) {
            e.preventDefault();

            // Crea un overlay di conferma più elaborato
            const confirmOverlay = document.createElement('div');
            confirmOverlay.className = 'aloe-demo-overlay';
            confirmOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            confirmOverlay.innerHTML = `
                <div style="max-width: 500px; padding: 30px; background-color: #1d1d1b; border: 2px solid #b08878;">
                    <h2 style="color: #b08878; margin-bottom: 20px;">Prenotazione SPA Miele</h2>
                    <p style="margin-bottom: 15px;">Hai cliccato sul bottone 'Prenota ora'!</p>
                    <p style="margin-bottom: 15px;">In una versione reale, questo ti porterebbe alla pagina di prenotazione della SPA Miele.</p>
                    <p style="margin-bottom: 25px;">Questa è una demo di Aloe che mostra come funziona l'integrazione del bottone di prenotazione.</p>
                    <button style="padding: 10px 30px; background-color: #b08878; color: white; border: none; cursor: pointer; text-transform: uppercase; letter-spacing: 1px;">Chiudi</button>
                </div>
            `;
            document.body.appendChild(confirmOverlay);

            // Chiudi l'overlay quando si clicca sul pulsante
            confirmOverlay.querySelector('button').addEventListener('click', function() {
                confirmOverlay.style.opacity = '0';
                confirmOverlay.style.transition = 'opacity 0.5s';
                setTimeout(() => {
                    confirmOverlay.remove();
                }, 500);
            });
        });
    }

    // Funzione per aggiungere l'effetto luminoso
    function addGlowEffect(button) {
        // Crea un contenitore per l'effetto luminoso
        const glowContainer = document.createElement('div');
        glowContainer.style.position = 'fixed';
        glowContainer.style.zIndex = '9998';
        glowContainer.style.pointerEvents = 'none';
        document.body.appendChild(glowContainer);

        // Crea diversi rettangoli per un effetto più elaborato
        for (let i = 0; i < 3; i++) {
            const glowEffect = document.createElement('div');
            glowEffect.className = 'glow-effect-' + i;
            glowEffect.style.position = 'absolute';
            glowEffect.style.zIndex = '999';
            glowEffect.style.pointerEvents = 'none';
            glowEffect.style.borderRadius = '2px';

            // Posiziona l'elemento rispetto al bottone
            updateGlowPosition(glowEffect, button, 40 + (i * 20));

            // Stile in base all'indice
            glowEffect.style.border = `2px solid rgba(176, 136, 120, ${0.8 - (i * 0.2)})`;
            glowEffect.style.boxShadow = `0 0 ${15 + (i * 5)}px rgba(176, 136, 120, ${0.6 - (i * 0.15)})`;
            glowEffect.style.transition = `all ${1 + (i * 0.3)}s ease-in-out`;

            // Inserisci l'elemento nel DOM
            glowContainer.appendChild(glowEffect);

            // Avvia l'animazione che rimpicciolisce il rettangolo con un ritardo in base all'indice
            setTimeout(() => {
                updateGlowPosition(glowEffect, button, 0);
                glowEffect.style.opacity = '0.8';

                // Ripeti l'animazione ogni 3 secondi con un offset per ogni rettangolo
                setInterval(() => {
                    // Espandi
                    updateGlowPosition(glowEffect, button, 40 + (i * 20));
                    glowEffect.style.opacity = '1';

                    // Contrai dopo un ritardo
                    setTimeout(() => {
                        updateGlowPosition(glowEffect, button, 0);
                        glowEffect.style.opacity = '0.8';
                    }, 1500 + (i * 200));
                }, 3000);
            }, 500 + (i * 300));
        }

        // Funzione per aggiornare la posizione dell'effetto luminoso
        function updateGlowPosition(element, targetButton, padding) {
            const rect = targetButton.getBoundingClientRect();

            element.style.top = (rect.top - padding) + 'px';
            element.style.left = (rect.left - padding) + 'px';
            element.style.width = (rect.width + (padding * 2)) + 'px';
            element.style.height = (rect.height + (padding * 2)) + 'px';
        }

        // Aggiorna la posizione quando si scorre la pagina
        window.addEventListener('scroll', function() {
            const glowElements = glowContainer.querySelectorAll('div');
            glowElements.forEach((element, index) => {
                updateGlowPosition(element, button, element.className.includes('0') ? 0 : (40 + ((index) * 20)));
            });
        });
    }

    // Nessun messaggio di benvenuto iniziale
});
