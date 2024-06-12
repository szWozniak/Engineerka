package com.example.backend.drone;

import com.example.backend.position.PositionEntity;

import java.util.Comparator;

public class RecordTimestampsComparator implements Comparator<PositionEntity> {
    @Override
    public int compare(PositionEntity o1, PositionEntity o2) {
        var date1 = o1.getDate();
        var date2 = o2.getDate();

        if (date1.equals(date2)){
            return o2.getTime().compareTo(o1.getTime());
        }

        return date2.compareTo(date1);
    }
}
