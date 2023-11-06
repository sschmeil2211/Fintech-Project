namespace ASP.NET___Fintech_API.Services
{
    public class InvestmentService
    { 
        private readonly double _maxIterations = Math.Pow(2, 32); //4.294.967.296 

        private static List<float> GenerateMonthlyFluctuations(float fluctuation)
        {
            Random random = new();
            List<float> fluctuations = new(); 
            for (int i = 0; i < 12; i++)
            {
                float randomValue = (float)(random.NextDouble() * (fluctuation * 2) - fluctuation);
                fluctuations.Add(randomValue);
            } 
            return fluctuations;
        } 

        private static void ApplyRandomFactor(List<float> profitList, float randomizer)
        {
            Random random = new();
            for (int i = 0; i < profitList.Count; i++) 
                if (random.NextDouble() <= randomizer)
                {
                    int index = random.Next(0, 12);
                    profitList[index] = (float)(random.NextDouble() * 200 - 100);
                }
        }

        public List<float> CalculateAnnualPercents(float expectedEff, float errorRange, float fluctuation, float randomizer)
        { 
            for (int i = 0; i < _maxIterations; i++)
            {
                List<float> randomNumbers = GenerateMonthlyFluctuations(fluctuation);
                float sum = randomNumbers.Sum();
                if (Math.Abs(sum - expectedEff) <= errorRange)
                {
                    ApplyRandomFactor(randomNumbers, randomizer);
                    return randomNumbers;
                }
            }
            throw new InvalidOperationException($"No se encontró una solución válida después de {_maxIterations} iteraciones.");
        }

        public Dictionary<string, float> SetInvestmentPercents(float expectedEff, float errorRange, float fluctuation, float randomizer)
        { 
            List<float> randomNumbers = CalculateAnnualPercents(expectedEff, errorRange, fluctuation, randomizer);
            Dictionary<string, float> percentsObject = new(); 
            // Genera un objeto donde la clave es la fecha y el valor es un arreglo de valores
            for (int i = 0; i < randomNumbers.Count; i++)
            {
                DateTime date = DateTime.UtcNow.AddMinutes(i + 3);
                string dateString = date.ToString("yyyy-MM-ddTHH:mm:ssZ");
                percentsObject[dateString] = randomNumbers[i];
            }
            return percentsObject; 
        }
    }
}
