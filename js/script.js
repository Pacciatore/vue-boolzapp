console.log('SCRIPT OK!');

console.log(contacts);

const app = new Vue({

    el: '#app',
    data: {
        newMessage: '',
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
                message: this.newMessage.trim(),
                status: 'sent'
            };

            if (toSend.message.length > 0) {
                this.contacts[activeIndex].messages.push(toSend);
            } else {
                console.log('impossibile inviare')
            }

            this.newMessage = '';

        }
    }

})