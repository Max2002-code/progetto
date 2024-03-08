const API_URL = 'https://striveschool-api.herokuapp.com/api/product/';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWViMTVlYzJkN2IxMTAwMTkwZTc2Y2YiLCJpYXQiOjE3MDk5MDUzODgsImV4cCI6MTcxMTExNDk4OH0.z7ssZ3h7aOaTK0-f6lda-pnIijFganylfk0s8ib69HE';

const createProduct = async (productData) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization':`Bearer ${token}`,
            	'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData)
        });

        if (!response.ok) {
            throw new Error('Errore durante la creazione del prodotto');
        }

        const data = await response.json();
        console.log('Prodotto creato:', data);

        // Aggiorna l'immagine con quella restituita dal server
        document.getElementById('imageUrl').src = data.imageUrl;

        return data;
    } catch (error) {
        console.error('Si è verificato un errore:', error.message);
        throw error;
    }
};

document.getElementById('form-nuovo-prodotto').addEventListener('submit', async (event) => {
    event.preventDefault();
    // Creiamo un oggetto che rappresenta il nuovo prodotto
    const productData = {
    	name: "Alienware X17 R2",
        brand: "Dell",
        imageUrl: "https://i.dell.com/sites/csimages/Product_Imagery/all/fp-aw-laptops-hero-a-1920x1440-v2.png",
        price: 2700,
        description: "Display da 17,3 pollici; FHD (1920 x 1080) a 165Hz 3ms o 360Hz 1ms; 4K (3840x 2160) a 120Hz 4ms\nCPU: Intel i7-12700H o i9-12900HK\nGPU: fino a Nvidia GeForce RTX 3080 Ti\nMemoria: fino a 64 GB DDR5, 4800 MHz\nMemoria: 512GB-4TB M.2, PCIe NVMe a stato solido"
    };
	
    try {
        const createdProduct = await createProduct(productData);
        console.log('Prodotto creato:', createdProduct);
    } catch (error) {
        console.error('Errore durante la creazione del prodotto:', error.message);
        if (error.response) {
            console.error('Dettagli dell\'errore:', error.response.data);
        }
    }
});