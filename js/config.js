var gertaConfig = {
    styles: {
        classic: 'Классический',
        modern: 'Современный',
        provance: 'Прованс',
        neoclassic: 'Неоклассика',
    },
    catalog: {
        previewSrc: (id, style, deviceType) => `photos/catalog/${deviceType}/${style}/preview/${id}.jpg`,
        gallerySrc: (id, style, deviceType) => idx => `photos/catalog/${deviceType}/${style}/gallery/${id}/${idx}.jpg`,
        thumbSrc: (id, style, deviceType) => idx => `photos/catalog/${deviceType}/${style}/thumbs/${id}/${idx}.jpg`,
        gallerySize: 3,
        items: {
            classic: [
                { title: '1', currentPrice: 50000, oldPrice: null },
                { title: '2', currentPrice: 50000, oldPrice: 70000 },
                { title: '3', currentPrice: 50000, oldPrice: 90000 },
                { title: '4', currentPrice: 50000, oldPrice: 70000 },
                { title: '5', currentPrice: 50000, oldPrice: 60000 },
                { title: '6', currentPrice: 50000, oldPrice: 55000 },
                { title: '7', currentPrice: 50000, oldPrice: 53000 },
                { title: '8', currentPrice: 50000, oldPrice: 86000 },
                { title: '9', currentPrice: 50000, oldPrice: 96000 },
            ],
            modern: [
                { title: '1', currentPrice: 50000, oldPrice: 80000 },
                { title: '2', currentPrice: 50000, oldPrice: 70000 },
                { title: '3', currentPrice: 50000, oldPrice: 90000 },
                { title: '4', currentPrice: 50000, oldPrice: 70000 },
                { title: '5', currentPrice: 50000, oldPrice: 60000 },
                { title: '6', currentPrice: 50000, oldPrice: 55000 },
                { title: '7', currentPrice: 50000, oldPrice: 53000 },
                { title: '8', currentPrice: 50000, oldPrice: 86000 },
                { title: '9', currentPrice: 50000, oldPrice: 96000 },
                { title: '10', currentPrice: 50000, oldPrice: 80000 },
                { title: '11', currentPrice: 50000, oldPrice: 70000 },
                { title: '12', currentPrice: 50000, oldPrice: 90000 },
                { title: '13', currentPrice: 50000, oldPrice: 70000 },
                { title: '14', currentPrice: 50000, oldPrice: 60000 },
                { title: '15', currentPrice: 50000, oldPrice: 55000 },
                { title: '16', currentPrice: 50000, oldPrice: 53000 },
                { title: '17', currentPrice: 50000, oldPrice: 86000 },
                { title: '18', currentPrice: 50000, oldPrice: 96000 },
            ],
            neoclassic: [
                { title: '1', currentPrice: 50000, oldPrice: 80000 },
                { title: '2', currentPrice: 50000, oldPrice: 70000 },
                { title: '3', currentPrice: 50000, oldPrice: 90000 },
                { title: '4', currentPrice: 50000, oldPrice: 70000 },
                { title: '5', currentPrice: 50000, oldPrice: 60000 },
                { title: '6', currentPrice: 50000, oldPrice: 55000 },
                { title: '7', currentPrice: 50000, oldPrice: 53000 },
                { title: '8', currentPrice: 50000, oldPrice: 86000 },
                { title: '9', currentPrice: 50000, oldPrice: 96000 },
                { title: '10', currentPrice: 50000, oldPrice: 80000 },
                { title: '11', currentPrice: 50000, oldPrice: 70000 },
                { title: '12', currentPrice: 50000, oldPrice: 90000 },
                { title: '13', currentPrice: 50000, oldPrice: 70000 },
                { title: '14', currentPrice: 50000, oldPrice: 60000 },
                { title: '15', currentPrice: 50000, oldPrice: 55000 },
                { title: '16', currentPrice: 50000, oldPrice: 53000 },
                { title: '17', currentPrice: 50000, oldPrice: 86000 },
                { title: '18', currentPrice: 50000, oldPrice: 96000 },
            ],
            provance: [
                { title: '1', currentPrice: 50000, oldPrice: 80000 },
                { title: '2', currentPrice: 50000, oldPrice: 70000 },
                { title: '3', currentPrice: 50000, oldPrice: 90000 },
                { title: '4', currentPrice: 50000, oldPrice: 70000 },
                { title: '5', currentPrice: 50000, oldPrice: 60000 },
                { title: '6', currentPrice: 50000, oldPrice: 55000 },
                { title: '7', currentPrice: 50000, oldPrice: 53000 },
                { title: '8', currentPrice: 50000, oldPrice: 86000 },
                { title: '9', currentPrice: 50000, oldPrice: 96000 },
            ]
        }
    },
    cases: {
        previewSrc: (id, deviceType) => `photos/cases/${deviceType}/preview/${id}.jpg`,
        gallerySrc: (id, deviceType) => idx => `photos/cases/${deviceType}/gallery/${id}/${idx}.jpg`,
        thumbSrc: (id, deviceType) => idx => `photos/cases/${deviceType}/thumbs/${id}/${idx}.jpg`,
        items: [
            {
                name: 'Без ручек под\u00A0заказ МДФ с\u00A0островом',
                style: 'classic',
                title: 'Считали аналогичную кухню в ИКЕА и она выходила тысяч на 20 дороже',
                texts: [
                    'Решили остановить свой выбор на глянцевых эмалевых фасадах и не прогадали.',
                    'Отдельно стоит отметить дизайнера Анастасию, она очень терпеливая)) Бывало, что я приходила к закрытию магазина, она все равно рисовала мне макет.'
                ],
                gallerySize: 5,
            },
            {
                name: 'Без ручек под\u00A0заказ МДФ с\u00A0островом',
                style: 'modern',
                title: 'Считали аналогичную кухню в ИКЕА и она выходила тысяч на 20 дороже',
                texts: [
                    'Решили остановить свой выбор на глянцевых эмалевых фасадах и не прогадали.',
                    'Отдельно стоит отметить дизайнера Анастасию, она очень терпеливая)) Бывало, что я приходила к закрытию магазина, она все равно рисовала мне макет.'
                ],
                gallerySize: 4,
            },
            {
                name: 'Без ручек под\u00A0заказ МДФ с\u00A0островом',
                style: 'neoclassic',
                title: 'Считали аналогичную кухню в ИКЕА и она выходила тысяч на 20 дороже',
                texts: [
                    'Решили остановить свой выбор на глянцевых эмалевых фасадах и не прогадали.',
                    'Отдельно стоит отметить дизайнера Анастасию, она очень терпеливая)) Бывало, что я приходила к закрытию магазина, она все равно рисовала мне макет.'
                ],
                gallerySize: 5,
            },
            {
                id: '4',
                name: 'Без ручек под\u00A0заказ МДФ с\u00A0островом',
                style: 'modern',
                title: 'Считали аналогичную кухню в ИКЕА и она выходила тысяч на 20 дороже',
                texts: [
                    'Решили остановить свой выбор на глянцевых эмалевых фасадах и не прогадали.',
                    'Отдельно стоит отметить дизайнера Анастасию, она очень терпеливая)) Бывало, что я приходила к закрытию магазина, она все равно рисовала мне макет.'
                ],
                gallerySize: 4,
            },
            {
                name: 'Без ручек под\u00A0заказ МДФ с\u00A0островом',
                style: 'provance',
                title: 'Считали аналогичную кухню в ИКЕА и она выходила тысяч на 20 дороже',
                texts: [
                    'Решили остановить свой выбор на глянцевых эмалевых фасадах и не прогадали.',
                    'Отдельно стоит отметить дизайнера Анастасию, она очень терпеливая)) Бывало, что я приходила к закрытию магазина, она все равно рисовала мне макет.'
                ],
                gallerySize: 4,
            },
            {
                name: 'Без ручек под\u00A0заказ МДФ с\u00A0островом',
                style: 'provance',
                title: 'Считали аналогичную кухню в ИКЕА и она выходила тысяч на 20 дороже',
                texts: [
                    'Решили остановить свой выбор на глянцевых эмалевых фасадах и не прогадали.',
                    'Отдельно стоит отметить дизайнера Анастасию, она очень терпеливая)) Бывало, что я приходила к закрытию магазина, она все равно рисовала мне макет.'
                ],
                gallerySize: 5,
            },
            {
                name: 'Без ручек под\u00A0заказ МДФ с\u00A0островом',
                style: 'classic',
                title: 'Считали аналогичную кухню в ИКЕА и она выходила тысяч на 20 дороже',
                texts: [
                    'Решили остановить свой выбор на глянцевых эмалевых фасадах и не прогадали.',
                    'Отдельно стоит отметить дизайнера Анастасию, она очень терпеливая)) Бывало, что я приходила к закрытию магазина, она все равно рисовала мне макет.'
                ],
                gallerySize: 4,
            },
            {
                name: 'Без ручек под\u00A0заказ МДФ с\u00A0островом',
                style: 'modern',
                title: 'Считали аналогичную кухню в ИКЕА и она выходила тысяч на 20 дороже',
                texts: [
                    'Решили остановить свой выбор на глянцевых  dzxэмалевых фасадах и не прогадали.',
                    'Отдельно стоит отметить дизайнера Анастасию, она очень терпеливая)) Бывало, что я приходила к закрытию магазина, она все равно рисовала мне макет.'
                ],
                gallerySize: 4,
            },
            {
                name: 'Без ручек под\u00A0заказ МДФ с\u00A0островом',
                style: 'neoclassic',
                title: 'Считали аналогичную кухню в ИКЕА и она выходила тысяч на 20 дороже',
                texts: [
                    'Решили остановить свой выбор на глянцевых эмалевых фасадах и не прогадали.',
                    'Отдельно стоит отметить дизайнера Анастасию, она очень терпеливая)) Бывало, что я приходила к закрытию магазина, она все равно рисовала мне макет.'
                ],
                gallerySize: 4,
            },
        ]
    }
}