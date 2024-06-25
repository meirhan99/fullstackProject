﻿using GoBye.BLL.Dtos.TripDtos;

namespace GoBye.BLL.Dtos.BusDtos
{
    public class BusDetailsDto
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public int Capacity { get; set; }
        public bool Available { get; set; }
        public string CurrentBranch { get; set; } = string.Empty;
        public string Model { get; set; } = string.Empty;
        public string Year { get; set; } = string.Empty;
        public string ClassBusName { get; set; } = string.Empty;
        public IEnumerable<TripDetailsDto> tripDetailsDtos { get; set; } = new List<TripDetailsDto>();

    }
}
