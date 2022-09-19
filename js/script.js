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
        setActiveContact(index) {
            this.activeIndex = index;
        },
        sendMessage(activeIndex) {

            const toSend = {
                date: this.actualDateOurFormat(),
                message: this.newMessage.text.trim(),
                status: 'sent'
            };

            if (this.contactsToSearch.length === 0) {
                if (toSend.message.length > 0) {
                    this.contacts[activeIndex].messages.push(toSend);

                    this.receiveMessage(this.contacts[activeIndex]);
                } else {
                    console.log('impossibile inviare');
                }
            } else {
                if (toSend.message.length > 0) {
                    this.contactsToSearch[activeIndex].messages.push(toSend);

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

            }, 1000)
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
                    }
                });
            }

            console.log(text);
            this.searchInput.text = '';
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
        getMessageHhMm(hourToChange) {

            const array = hourToChange.split(" "); // ["10/01/2020",  "15:30:55"]
            const ora = array[1]; // "15:30:55"
            const arrayOra = ora.split(":"); // ["15", "30", "55"]
            hourToChange = arrayOra[0] + ":" + arrayOra[1]; // "15:30"

            return hourToChange;

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
        }
    }

})