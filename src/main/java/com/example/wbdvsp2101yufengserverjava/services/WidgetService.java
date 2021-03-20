//citation: used jannunzi java repo's code
package com.example.wbdvsp2101yufengserverjava.services;

import com.example.wbdvsp2101yufengserverjava.models.Widget;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class WidgetService {
  private List<Widget> widgets = new ArrayList<Widget>();

  public Widget createWidget(String tid, Widget widget) {
    Long id = (new Date()).getTime();
    widget.setId(id);
    widget.setTopicId(tid);
    widgets.add(widget);
    return widget;
  }

  public List<Widget> findAllWidgets() {
    return widgets;
  }

  public List<Widget> findWidgetsForTopic(String tid) {
    List<Widget> ws = new ArrayList<Widget>();
    for(Widget w: widgets) {
      if(w.getTopicId().equals(tid)) {
        ws.add(w);
      }
    }
    return ws;
  }

  public int updateWidget(Long wid, Widget widget) {
    for(int i = 0; i < widgets.size(); i++) {
      Widget w = widgets.get(i);
      if(w.getId().equals(wid)) {
        widgets.set(i, widget);
        return 1;
      }
    }
    return 0;
  }

  public int deleteWidget(Long wid) {
    int index = -1;
    for(int i = 0; i < widgets.size(); i++) {
      Widget w = widgets.get(i);
      if(w.getId().equals(wid)) {
        index = i;
      }
    }
    if(index >= 0) {
      widgets.remove(index);
      return 1;
    }
    return 0;
  }
}
