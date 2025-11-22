<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BirdQuest - 420-Friendly Hotels</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background-color: #121212;
            color: #e0e0e0;
            line-height: 1.6;
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
        }

        header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid #333;
        }

        h1 {
            color: #4CAF50;
            font-size: 2.5rem;
            margin-bottom: 10px;
        }

        .subtitle {
            color: #9e9e9e;
            font-size: 1.1rem;
            margin-bottom: 20px;
        }

        .section {
            background-color: #1e1e1e;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 25px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border-left: 4px solid #4CAF50;
        }

        .section h2 {
            color: #4CAF50;
            margin-bottom: 15px;
            font-size: 1.5rem;
        }

        .filters {
            display: flex;
            gap: 15px;
            margin-bottom: 15px;
            flex-wrap: wrap;
        }

        .filter-item {
            background-color: #2d2d2d;
            padding: 8px 15px;
            border-radius: 20px;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .filter-item .arrow {
            color: #4CAF50;
            font-weight: bold;
        }

        .location-list {
            list-style-type: none;
        }

        .location-list li {
            padding: 12px 0;
            border-bottom: 1px solid #333;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .location-list li:last-child {
            border-bottom: none;
        }

        .location-count {
            background-color: #4CAF50;
            color: #121212;
            padding: 3px 8px;
            border-radius: 12px;
            font-size: 0.8rem;
            font-weight: bold;
        }

        .accommodation-count {
            color: #4CAF50;
            font-weight: bold;
        }

        footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #333;
            color: #9e9e9e;
            font-size: 0.9rem;
        }

        @media (max-width: 768px) {
            body {
                padding: 15px;
            }
            
            h1 {
                font-size: 2rem;
            }
            
            .section {
                padding: 15px;
            }
        }
    </style>
</head>
<body>
    <header>
        <h1>BirdQuest</h1>
        <p class="subtitle">Search 420-Friendly Hotels, cities, states, countries...</p>
    </header>

    <main>
        <section class="section">
            <h2>Washington</h2>
            <div class="filters">
                <div class="filter-item">
                    Rating <span class="arrow">↓</span>
                </div>
                <div class="filter-item">
                    cities <span class="arrow">↓</span>
                </div>
            </div>
        </section>

        <section class="section">
            <h2>Arizona 420-Friendly Hotels</h2>
            <ul class="location-list">
                <li>
                    <span>1 cities</span>
                    <span class="arrow">↓</span>
                </li>
            </ul>
        </section>

        <section class="section">
            <h2>420-Friendly Hotels in Canada</h2>
            <p><span class="accommodation-count">2</span> canvabs-friendly accommodations</p>
        </section>

        <section class="section">
            <h2>British Columbia 420-Friendly Hotels</h2>
            <ul class="location-list">
                <li>
                    <span>1 cities</span>
                    <span class="arrow">↓</span>
                </li>
            </ul>
        </section>

        <section class="section">
            <h2>Ontario 420-Friendly Hotels</h2>
            <ul class="location-list">
                <li>
                    <span>1 cities</span>
                    <span class="arrow">↓</span>
                </li>
            </ul>
        </section>

        <section class="section">
            <h2>420-Friendly Hotels in Netherlands</h2>
            <p><span class="accommodation-count">1</span> canvabs-friendly accommodations</p>
        </section>
    </main>

    <footer>
        <p>BirdQuest &copy; 2023 - Your guide to 420-friendly travel</p>
    </footer>
</body>
</html>
