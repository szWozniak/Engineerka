package com.example.backend.domain.drone;

import com.example.backend.domain.position.FlighRecordEntity;

import java.util.Comparator;

public class RecordTimestampsComparator implements Comparator<FlighRecordEntity> {
    @Override
    public int compare(FlighRecordEntity o1, FlighRecordEntity o2) {
        var date1 = o1.getDate();
        var date2 = o2.getDate();

        if (date1.equals(date2)){
            return o2.getTime().compareTo(o1.getTime());
        }

        return date2.compareTo(date1);
    }
}
