console.log('SCRIPT OK!');

console.log(contacts);

const app = new Vue({

    el: '#app',
    data: {
        newMessage: {
            text: '',
            empty: false
        },
        activeIndex: 0,
        contacts,
    },
    methods: {
        setActiveContact(index) {
            this.activeIndex = index;
            // TODO orario da corregere da h/m in formato hh/mm
            const dateToFormat = this.contacts[index].messages[0].date;
            const array = dateToFormat.split(" "); // ["10/01/2020",  "15:30:55"]
            const ora = array[1]; // "15:30:55"
            const arrayOra = ora.split(":"); // ["15", "30", "55"]
            const oreMinuti = arrayOra[0] + ":" + arrayOra[1]; // "15:30"
            console.log(oreMinuti);

            const adesso = new Date();
            console.log(adesso.getHours() + ":" + adesso.getMinutes());
        },
        sendMessage(activeIndex) {

            const toSend = {
                date: new Date(),
                message: this.newMessage.text.trim(),
                status: 'sent'
            };

            if (toSend.message.length > 0) {
                this.contacts[activeIndex].messages.push(toSend);

                this.receiveMessage(activeIndex);
            } else {
                console.log('impossibile inviare');
            }

            this.newMessage.text = '';


        },
        receiveMessage(activeIndex) {
            setTimeout(() => {
                const toReceive = {
                    date: new Date(),
                    message: 'Ok!',
                    status: 'received'
                };
                this.contacts[activeIndex].messages.push(toReceive);

            }, 1000)
        },
        emptyCheck(text) {
            const toCheck = text.trim();
            if (toCheck.length === 0) {
                this.newMessage.empty = true;
                console.log(this.newMessage.empty);
            } else {
                this.newMessage.empty = false;
                console.log(this.newMessage.empty);
            }
        }
    }

})