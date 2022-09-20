console.log('SCRIPT OK!');

console.log(contacts);

const app = new Vue({

    el: '#app',
    data: {
        newMessage: {
            text: '',
            empty: false
        },
        searchInput: {
            text: '',
            empty: false
        },
        activeIndex: 0,
        contacts,
        contactsToSearch: []
    },
    methods: {
        // Contact functions
        setActiveContact(index) {
            this.activeIndex = index;
            this.scrollToBottom();
        },
        searchContact(text) {
            this.contactsToSearch.length = 0;

            if (text.trim().length > 0) {
                text = text.toLowerCase();
                this.contacts.forEach(contact => {

                    const lowerName = contact.name.toLowerCase();

                    if (lowerName.startsWith(text)) {
                        this.contactsToSearch.push(contact);
                        console.log(this.contactsToSearch)
                        this.activeIndex = 0;
                        this.scrollToBottom();
                    }
                });
            }

            console.log(text);
        },
        createContact(inputName) {

            if (inputName.length < 3) {
                return;
            } else {
                console.log('Creazione contatto... ', this.searchInput);

                const newDefaultContact = {
                    name: inputName,
                    avatar: '_def',
                    visible: true,
                    messages: [{
                        date: this.actualDateOurFormat(),
                        message: 'Inizia una conversazione',
                        status: 'new'
                    }]
                };

                this.contacts.push(newDefaultContact);
                this.searchContact(newDefaultContact.name);

            }

            this.searchInput.text = '';

        },

        // Message functions
        sendMessage(activeIndex) {

            const toSend = {
                date: this.actualDateOurFormat(),
                message: this.newMessage.text.trim(),
                status: 'sent'
            };

            // Controllo se il messaggio lo invio mentre sto cercando un contatto o meno
            if (this.contactsToSearch.length === 0) {
                if (toSend.message.length > 0) {

                    // Eliminazione notifica nuova chat
                    this.contacts[activeIndex].messages[0].status === 'new' ? this.contacts[activeIndex].messages.pop() : '';

                    this.contacts[activeIndex].messages.push(toSend);

                    this.scrollToBottom();
                    this.receiveMessage(this.contacts[activeIndex]);
                } else {
                    console.log('impossibile inviare');
                }
            } else {
                if (toSend.message.length > 0) {

                    // Eliminazione notifica nuova chat
                    this.contactsToSearch[activeIndex].messages[0].status === 'new' ? this.contactsToSearch[activeIndex].messages.pop() : '';

                    this.contactsToSearch[activeIndex].messages.push(toSend);

                    this.scrollToBottom();
                    this.receiveMessage(this.contactsToSearch[activeIndex]);
                } else {
                    console.log('impossibile inviare');
                }
            }

            this.newMessage.text = '';


        },
        receiveMessage(contact) {
            setTimeout(() => {
                const toReceive = {
                    date: this.actualDateOurFormat(),
                    message: 'Ok!',
                    status: 'received'
                };
                contact.messages.push(toReceive);

                this.seenCheck(contact);

                this.scrollToBottom();

                // Metodo per aggiungere la classe dinamicamente
                // setTimeout(() => {
                //     const el = document.querySelector(`.chat-message-text:nth-child(${contact.messages.length})`);
                //     el.classList.add('received');
                //     console.log({ el });

                // }, 5);

            }, 1000);
        },
        deleteMessage(message) {
            if (!message.status.includes('deleted')) {
                message.message = 'Messaggio eliminato';
                message.status += ' deleted';
            }
        },
        showMessageInfo() {
            console.log('message info')
        },

        emptyCheck(textContainer) {
            const toCheck = textContainer.text.trim();
            if (toCheck.length === 0) {
                textContainer.empty = true;
                console.log(this.newMessage.empty);
            } else {
                textContainer.empty = false;
                console.log(this.newMessage.empty);
            }
        },
        getMessageHhMm(hourToChange) {

            const array = hourToChange.split(" "); // ["10/01/2020",  "15:30:55"]
            const ora = array[1]; // "15:30:55"
            const arrayOra = ora.split(":"); // ["15", "30", "55"]
            hourToChange = arrayOra[0] + ":" + arrayOra[1]; // "15:30"

            return hourToChange;

        },
        // TODO Per ora funziona solo dopo che si invia un messaggio
        seenCheck(contact) {
            contact.messages.forEach(message => {
                if (message.status === 'sent')
                    message.status += ' seen';
            });
        },

        // Misc functions
        actualDateOurFormat() {
            const nowDate = new Date();

            const dayOfMonth = nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate.getDate();
            const month = (nowDate.getMonth() + 1) < 10 ? '0' + (nowDate.getMonth() + 1) : (nowDate.getMonth() + 1);
            const year = nowDate.getFullYear();
            const hours = nowDate.getHours() < 10 ? '0' + nowDate.getHours() : nowDate.getHours();
            const minutes = nowDate.getMinutes() < 10 ? '0' + nowDate.getMinutes() : nowDate.getMinutes();
            const seconds = nowDate.getSeconds() < 10 ? '0' + nowDate.getSeconds() : nowDate.getSeconds();

            const goodDate = `${dayOfMonth}/${month}/${year} ${hours}:${minutes}:${seconds}`;
            // console.log(goodDate);
            return goodDate;
        },
        scrollToBottom() {
            setTimeout(() => {
                const messages = document.getElementById("chat-display");
                messages.scrollTop = messages.scrollHeight - messages.offsetHeight;
            }, 5);
        }
    }

})

// Tentativo fallito di visualizzato
// seenCheck(activeIndex, startingIndex) {
//     console.log('starting index: ', startingIndex, ' active index: ', activeIndex)
//     const latestMessages = this.contacts[activeIndex].messages.slice(startingIndex);
//     console.log({ latestMessages });


//     latestMessages.forEach(latestMessage => {

//         let seen = false
//         if (latestMessage.status.includes('received')) {
//             seen = true
//         } else {
//             seen = false;
//         }
//         return seen;

//     });

// },


//#region TODO Bugs:
//              -creazione multipla di uno stesso contatto