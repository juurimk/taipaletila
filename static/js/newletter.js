console.log('Newsletter/Contact form script loaded');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, looking for contact form...');
    
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('contact-submit');
    
    // Only run contact form code if the contact form exists on the page
    if (!form) {
        console.log('No contact form found on this page');
        return;
    }
    
    console.log('Contact form found:', form);
    console.log('Submit button found:', submitBtn);
    
    if (!submitBtn) {
        console.error('Submit button not found!');
        return;
    }
    
    // Create message div if it doesn't exist
    let messageDiv = document.getElementById('form-messages');
    if (!messageDiv) {
        console.log('Creating message div...');
        messageDiv = document.createElement('div');
        messageDiv.id = 'form-messages';
        messageDiv.style.display = 'none';
        messageDiv.className = 'alert';
        messageDiv.setAttribute('role', 'alert');
        form.parentNode.insertBefore(messageDiv, form);
    }
    
    console.log('Adding form submit listener...');
    form.addEventListener('submit', function(e) {
        console.log('Form submit intercepted!');
        e.preventDefault(); // Prevent normal form submission
        
        // Show loading state
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Lähetetään...';
        messageDiv.style.display = 'none';
        
        // Get form data - using the actual field names from HTML
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const phonenumber = formData.get('phonenumber');
        const message = formData.get('message');
        
        // Get selected services from checkboxes
        const selectedServices = formData.getAll('services[]');
        
        console.log('Raw form values:');
        console.log('- name:', name);
        console.log('- email:', email);
        console.log('- phonenumber:', phonenumber);
        console.log('- selectedServices:', selectedServices);
        console.log('- message:', message);
        
        // Map service values to readable labels
        const serviceLabels = {
            'ai-automaatiot': 'Ai-automaatiot ja koulutukset',
            'markkinointi': 'Markkinointi ja mainonta',
            'sisallontuotanto': 'Sisällöntuotannon palvelut'
        };
        
        // Format selected services for display
        const servicesText = selectedServices.length > 0 
            ? selectedServices.map(service => serviceLabels[service] || service).join(', ')
            : 'Ei valintoja';
        
        // Create subject line based on selected services
        const subject = selectedServices.length > 0 
            ? `Yhteydenottopyyntö: ${selectedServices.map(service => serviceLabels[service] || service).join(', ')}`
            : 'Yhteydenottopyyntö juuri.ai sivustolta';
        
        // Create formatted email body with all fields INCLUDING phone number
        const formattedBody = `
<h3>Uusi yhteydenottopyyntö</h3>

<p><strong>Nimi:</strong> ${name}</p>
<p><strong>Sähköposti:</strong> ${email}</p>
<p><strong>Puhelinnumero:</strong> ${phonenumber}</p>

<p><strong>Kiinnostuksen kohteet:</strong> ${servicesText}</p>

<p><strong>Viesti:</strong></p>
<p>${message.replace(/\n/g, '<br>')}</p>

<hr>
<p><em>Lähetetty juuri.ai sivustolta ${new Date().toLocaleString('fi-FI')}</em></p>
        `.trim();
        
        console.log('Subject:', subject);
        console.log('Services selected:', servicesText);
        console.log('Phone number:', phonenumber);
        console.log('Formatted body:', formattedBody);
        
        // Create converted data for mailform
        const convertedData = new FormData();
        convertedData.append('from', email);
        convertedData.append('subject', subject);
        convertedData.append('body', formattedBody);
        
        console.log('Sending AJAX request to:', form.action);
        console.log('Original form data:', [...formData.entries()]);
        console.log('Converted form data:', [...convertedData.entries()]);
        
        // Submit via AJAX using converted data
        fetch(form.action, {
            method: 'POST',
            body: convertedData
        })
        .then(response => {
            console.log('Response received:', response.status, response.ok);
            if (response.ok) {
                // Success
                messageDiv.className = 'alert alert-success';
                messageDiv.textContent = 'Kiitos viestistäsi! Otamme sinuun yhteyttä pian.';
                messageDiv.style.display = 'block';
                messageDiv.style.color = '#155724';
                messageDiv.style.backgroundColor = '#d4edda';
                messageDiv.style.border = '1px solid #c3e6cb';
                messageDiv.style.padding = '15px';
                messageDiv.style.borderRadius = '4px';
                messageDiv.style.marginBottom = '20px';
                form.reset(); // Clear the form
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            // Error
            console.error('Error:', error);
            messageDiv.className = 'alert alert-danger';
            messageDiv.textContent = 'Viestin lähetys epäonnistui. Yritä uudelleen tai ota yhteyttä suoraan sähköpostilla.';
            messageDiv.style.display = 'block';
            messageDiv.style.color = '#721c24';
            messageDiv.style.backgroundColor = '#f8d7da';
            messageDiv.style.border = '1px solid #f5c6cb';
            messageDiv.style.padding = '15px';
            messageDiv.style.borderRadius = '4px';
            messageDiv.style.marginBottom = '20px';
        })
        .finally(() => {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        });
    });
    
    console.log('Contact form setup complete');
});
