fetch('../../modular/footer.xml')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to load footer: ${response.status}`);
        }
        return response.text();
    })
    .then(navHTML => {
        document.getElementById('injectablefootercontent').innerHTML = navHTML;
    })
    .catch(error => {
        console.error('Error loading footer:', error);
    });


fetch('../../modular/description.html')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to load description: ${response.status}`);
        }
        return response.text();
    })
    .then(navHTML => {
        document.getElementById('injectabledescriptioncontent').innerHTML = navHTML;
    })
    .catch(error => {
        console.error('Error loading description:', error);
    });

fetch('../../modular/navbar.html')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to load nav: ${response.status}`);
        }
        return response.text();
    })
    .then(navHTML => {
        document.getElementById('navbarcontent').innerHTML = navHTML;
    })
    .catch(error => {
        console.error('Error loading navigation:', error);
    });


document.addEventListener("DOMContentLoaded", () => {
    const scheduleContainer = document.getElementById("injectableschedulecontent");
    const biosContainer = document.getElementById("injectablespeakercontent");

    // Fetch the schedule JSON
    fetch("../../modular/conference.json")
        .then(response => response.json())
        .then(data => {
            if (data[0].status === "live") {
                const table = document.createElement("table");

                const thead = document.createElement("thead");
                const headerRow = document.createElement("tr");
                const timeHeader = document.createElement("th");
                timeHeader.textContent = "Time";
                const eventHeader = document.createElement("th");
                eventHeader.textContent = "Event";
                headerRow.appendChild(timeHeader);
                headerRow.appendChild(eventHeader);
                thead.appendChild(headerRow);
                table.appendChild(thead);

                const tbody = document.createElement("tbody");
                data.slice(1).forEach(item => {
                    const row = document.createElement("tr");

                    const timeCell = document.createElement("td");
                    timeCell.textContent = item.time;

                    const eventCell = document.createElement("td");
                    if (item.id) {
                        const link = document.createElement("a");
                        link.href = `#${item.id}`;
                        link.textContent = item.event;
                        eventCell.appendChild(link);
                    } else {
                        eventCell.textContent = item.event;
                    }

                    row.appendChild(timeCell);
                    row.appendChild(eventCell);
                    tbody.appendChild(row);
                });
                table.appendChild(tbody);

                scheduleContainer.appendChild(table);

                fetch("../../modular/speakers.json")
                    .then(response => response.json())
                    .then(biosData => {
                        biosData.forEach(speaker => {
                            const profileDiv = document.createElement("div");
                            profileDiv.classList.add("profile", "row");
                            profileDiv.id = speaker.id;

                            const imageDiv = document.createElement("div");
                            imageDiv.classList.add("two", "columns");
                            const img = document.createElement("img");
                            img.classList.add("headshot");
                            img.src = speaker.image;
                            imageDiv.appendChild(img);

                            const textDiv = document.createElement("div");
                            textDiv.classList.add("ten", "columns");

                            const nameSpan = document.createElement("span");
                            nameSpan.classList.add("name");
                            nameSpan.textContent = speaker.name;

                            const bioSpan = document.createElement("span");
                            bioSpan.classList.add("bio");
                            bioSpan.innerHTML = speaker.bio;

                            textDiv.appendChild(nameSpan);
                            textDiv.appendChild(bioSpan);

                            profileDiv.appendChild(imageDiv);
                            profileDiv.appendChild(textDiv);

                            biosContainer.appendChild(profileDiv);
                        });
                    })
                    .catch(error => console.error("Error loading bios:", error));
            } else {
                const message = document.createElement("p");
                message.innerHTML = "We are planning a great event this year! As the event date, <b>April 13th, 2026</b>, draws nearer, check back for information about our speaker list and conference.";
                message.className = "lead";
                message.style.textAlign = "center";
                message.style.paddingTop = "50px";
                scheduleContainer.appendChild(message);
            }
        })
        .catch(error => console.error("Error loading schedule:", error));
});

fetch("../../modular/eventdetails.json")
        .then(response => response.json())
        .then(eventDetails => {
            // Extract the date details
            const eventDate = `${eventDetails[0].month} ${eventDetails[0].day}, ${eventDetails[0].year}`;
            const eventYear = eventDetails[0].year;
            const eventState = eventDetails[1].state;
            const themename = eventDetails[2].themename;
            const themedescription = eventDetails[2].themedescription;
            const liveLink = eventDetails[1].live;
            const registerLink = eventDetails[1].register;
            const speakerLink = eventDetails[1].speaker;

            document.querySelectorAll(".event-date").forEach(element => {
                element.textContent = eventDate;
            });

            document.querySelectorAll(".event-year").forEach(element => {
                element.textContent = eventYear;
            });

            const themeTitle = document.getElementById("themetitle");
            const themeContent = document.getElementById("themedescription");

            if (themename && themedescription) {
                themeTitle.innerHTML = `${themename}`;
                themeContent.innerHTML = `<i>${themename}</i> ${themedescription}`;
            }


            const heroText = document.getElementById("herotext");
            const mobHero = document.getElementById("mobhero");

            if (eventState === "live") {
                heroText.innerHTML = `
                    <h1>TEDxGunn High School <b>Youth</b> ${eventYear} is here!<br><br>
                    <a id="Register" href="${liveLink}" target="_blank">Watch Now
                        <svg width="12" height="21" viewBox="0 0 12 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.4609 10.1719C11.4609 9.87891 11.3438 9.60938 11.1211 9.39844L1.83984 0.304688C1.62891 0.105469 1.37109 0 1.06641 0C0.46875 0 0 0.457031 0 1.06641C0 1.35938 0.117188 1.62891 0.304688 1.82812L8.83594 10.1719L0.304688 18.5156C0.117188 18.7148 0 18.9727 0 19.2773C0 19.8867 0.46875 20.3438 1.06641 20.3438C1.37109 20.3438 1.62891 20.2383 1.83984 20.0273L11.1211 10.9453C11.3438 10.7227 11.4609 10.4648 11.4609 10.1719Z" fill="currentColor"/>
                        </svg>
                    </a>
                    </h1>`;
                mobHero.innerHTML = `
                    <center><div >
                        <h2 style="color: white;">TEDxGunn High School <b>Youth</b> ${eventYear} is here! 
                            </br></br>
                            <a id="Register" href=${liveLink}>Watch Now  
                                <svg width="9" height="15.75" viewBox="0 0 12 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.4609 10.1719C11.4609 9.87891 11.3438 9.60938 11.1211 9.39844L1.83984 0.304688C1.62891 0.105469 1.37109 0 1.06641 0C0.46875 0 0 0.457031 0 1.06641C0 1.35938 0.117188 1.62891 0.304688 1.82812L8.83594 10.1719L0.304688 18.5156C0.117188 18.7148 0 18.9727 0 19.2773C0 19.8867 0.46875 20.3438 1.06641 20.3438C1.37109 20.3438 1.62891 20.2383 1.83984 20.0273L11.1211 10.9453C11.3438 10.7227 11.4609 10.4648 11.4609 10.1719Z" fill="currentColor"/>
                                </svg>
                            </a>
                            </br>
                        </h2>
                    </div></center>
                `;
            } else if (eventState === "register") {
                heroText.innerHTML = `
                    <h1>TEDxGunn High School <b>Youth</b> ${eventYear} is upcoming!<br><br>
                    <a id="Register" href="${registerLink}" target="_blank">Register
                        <svg width="12" height="21" viewBox="0 0 12 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.4609 10.1719C11.4609 9.87891 11.3438 9.60938 11.1211 9.39844L1.83984 0.304688C1.62891 0.105469 1.37109 0 1.06641 0C0.46875 0 0 0.457031 0 1.06641C0 1.35938 0.117188 1.62891 0.304688 1.82812L8.83594 10.1719L0.304688 18.5156C0.117188 18.7148 0 18.9727 0 19.2773C0 19.8867 0.46875 20.3438 1.06641 20.3438C1.37109 20.3438 1.62891 20.2383 1.83984 20.0273L11.1211 10.9453C11.3438 10.7227 11.4609 10.4648 11.4609 10.1719Z" fill="currentColor"/>
                        </svg>
                    </a>
                    </h1>`;
                mobHero.innerHTML = `
                    <center><div >
                        <h2 style="color: white;">TEDxGunn High School <b>Youth</b> ${eventYear} is upcoming! 
                            </br></br>
                            <a id="Register" href=${registerLink}>Register  
                                <svg width="9" height="15.75" viewBox="0 0 12 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.4609 10.1719C11.4609 9.87891 11.3438 9.60938 11.1211 9.39844L1.83984 0.304688C1.62891 0.105469 1.37109 0 1.06641 0C0.46875 0 0 0.457031 0 1.06641C0 1.35938 0.117188 1.62891 0.304688 1.82812L8.83594 10.1719L0.304688 18.5156C0.117188 18.7148 0 18.9727 0 19.2773C0 19.8867 0.46875 20.3438 1.06641 20.3438C1.37109 20.3438 1.62891 20.2383 1.83984 20.0273L11.1211 10.9453C11.3438 10.7227 11.4609 10.4648 11.4609 10.1719Z" fill="currentColor"/>
                                </svg>
                            </a>
                            </br>
                        </h2>
                    </div></center>
                `;
            } else if (eventState === "speaker") {
                heroText.innerHTML = `
                <h1>TEDxGunn High School <b>Youth</b> ${eventYear} is upcoming!<br><br>
                <a id="Register" href="${speakerLink}" target="_blank">Interested in <br> Speaking?
                    <svg width="12" height="21" viewBox="0 0 12 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.4609 10.1719C11.4609 9.87891 11.3438 9.60938 11.1211 9.39844L1.83984 0.304688C1.62891 0.105469 1.37109 0 1.06641 0C0.46875 0 0 0.457031 0 1.06641C0 1.35938 0.117188 1.62891 0.304688 1.82812L8.83594 10.1719L0.304688 18.5156C0.117188 18.7148 0 18.9727 0 19.2773C0 19.8867 0.46875 20.3438 1.06641 20.3438C1.37109 20.3438 1.62891 20.2383 1.83984 20.0273L11.1211 10.9453C11.3438 10.7227 11.4609 10.4648 11.4609 10.1719Z" fill="currentColor"/>
                    </svg>
                </a>
                </h1>`;
            mobHero.innerHTML = `
                <center><div >
                    <h2 style="color: white;">TEDxGunn High School <b>Youth</b> ${eventYear} is upcoming! 
                        </br></br>
                        <a id="Register" href=${speakerLink}>Interested in Speaking?  
                            <svg width="9" height="15.75" viewBox="0 0 12 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.4609 10.1719C11.4609 9.87891 11.3438 9.60938 11.1211 9.39844L1.83984 0.304688C1.62891 0.105469 1.37109 0 1.06641 0C0.46875 0 0 0.457031 0 1.06641C0 1.35938 0.117188 1.62891 0.304688 1.82812L8.83594 10.1719L0.304688 18.5156C0.117188 18.7148 0 18.9727 0 19.2773C0 19.8867 0.46875 20.3438 1.06641 20.3438C1.37109 20.3438 1.62891 20.2383 1.83984 20.0273L11.1211 10.9453C11.3438 10.7227 11.4609 10.4648 11.4609 10.1719Z" fill="currentColor"/>
                            </svg>
                        </a>
                        </br>
                    </h2>
                </div></center>
            `;
            } else {
                heroText.innerHTML = `<h1>TEDxGunn High School <b>Youth</b> ${eventYear} is Upcoming</h1>`;
                mobhero.innerHTML = `<h2>TEDxGunn High School <b>Youth</b> ${eventYear} is Upcoming</h2>`;
            }
        })
        .catch(error => console.error("Error loading event details:", error));