let editingIndex = -1;

        document.addEventListener('DOMContentLoaded', loadSpecies);

        function saveSpecies() {
            const speciesName = document.getElementById('speciesName').value;
            const location = document.getElementById('location').value;
            const sighted = document.getElementById('sightedCheckbox').checked;

            if (speciesName === '' || location === '') {
                alert('Por favor, complete todos los campos.');
                return;
            }

            const species = {
                name: speciesName,
                location: location,
                sighted: sighted
            };

            let speciesList = JSON.parse(localStorage.getItem('speciesList')) || [];

            if (editingIndex === -1) {
                speciesList.push(species);
            } else {
                speciesList[editingIndex] = species;
                editingIndex = -1;
            }

            localStorage.setItem('speciesList', JSON.stringify(speciesList));
            clearInputs();
            loadSpecies();
        }

        function loadSpecies() {
            const speciesList = JSON.parse(localStorage.getItem('speciesList')) || [];
            const speciesListContainer = document.getElementById('speciesList');
            speciesListContainer.innerHTML = '';

            speciesList.forEach((species, index) => {
                const speciesItem = document.createElement('li');
                speciesItem.className = 'list-group-item d-flex justify-content-between align-items-center';
                
                const speciesText = `
                    <span>
                        <strong>${species.name}</strong> - ${species.location}
                        ${species.sighted ? '<span class="badge bg-success ms-2">Avistado</span>' : ''}
                    </span>
                `;
                speciesItem.innerHTML = speciesText;

                const actionButtons = document.createElement('div');
                
                const editButton = document.createElement('button');
                editButton.className = 'btn btn-secondary btn-sm me-2';
                editButton.textContent = 'Editar';
                editButton.onclick = () => editSpecies(index);

                const deleteButton = document.createElement('button');
                deleteButton.className = 'btn btn-danger btn-sm';
                deleteButton.textContent = 'Eliminar';
                deleteButton.onclick = () => deleteSpecies(index);

                actionButtons.appendChild(editButton);
                actionButtons.appendChild(deleteButton);
                speciesItem.appendChild(actionButtons);

                speciesListContainer.appendChild(speciesItem);
            });
        }

        function editSpecies(index) {
            const speciesList = JSON.parse(localStorage.getItem('speciesList')) || [];
            const species = speciesList[index];

            document.getElementById('speciesName').value = species.name;
            document.getElementById('location').value = species.location;
            document.getElementById('sightedCheckbox').checked = species.sighted;

            editingIndex = index;
        }

        function deleteSpecies(index) {
            let speciesList = JSON.parse(localStorage.getItem('speciesList')) || [];
            speciesList.splice(index, 1);
            localStorage.setItem('speciesList', JSON.stringify(speciesList));
            loadSpecies();
        }

        function clearInputs() {
            document.getElementById('speciesName').value = '';
            document.getElementById('location').value = '';
            document.getElementById('sightedCheckbox').checked = false;
            editingIndex = -1;
        }